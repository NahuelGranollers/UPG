from flask import Blueprint, jsonify, request, redirect, session, current_app
from models import db, Message, User, News
from game_state import public_servers
import requests
import uuid
from datetime import datetime

api = Blueprint('api', __name__, url_prefix='/api')
auth = Blueprint('auth', __name__, url_prefix='/auth')

import hashlib
import json
import os
import psutil
import platform
import time

# --- Admin Routes ---
@api.route('/admin/unlock', methods=['POST'])
def admin_unlock():
    data = request.get_json()
    password = data.get('password')
    if not password:
        return {'ok': False, 'error': 'missing_password'}, 400
        
    try:
        # Try to read admin-secret.json from root or server/ folder
        secret_path = 'admin-secret.json'
        if not os.path.exists(secret_path):
            secret_path = 'server/admin-secret.json'
            
        if not os.path.exists(secret_path):
            return {'ok': False, 'error': 'no_secret_file'}, 500
            
        with open(secret_path, 'r') as f:
            secret = json.load(f)
            
        salt = bytes.fromhex(secret['salt'])
        derived = bytes.fromhex(secret['derived'])
        
        # Verify using scrypt
        # Node.js scrypt default params: N=16384, r=8, p=1, maxmem=32*1024*1024
        # Python hashlib.scrypt needs these params to match
        check = hashlib.scrypt(password.encode(), salt=salt, n=16384, r=8, p=1, dklen=64)
        
        if check == derived:
            session['admin_unlocked'] = True
            return {'ok': True}
        else:
            return {'ok': False, 'error': 'invalid_password'}, 401
            
    except Exception as e:
        current_app.logger.error(f"Admin unlock error: {e}")
        return {'ok': False, 'error': 'internal_error'}, 500

# --- API Routes ---
@api.route('/health', methods=['GET'])
def health():
    return {'status': 'ok'}, 200

@api.route('/stats', methods=['GET'])
def system_stats():
    try:
        process = psutil.Process(os.getpid())
        return jsonify({
            'cpu': psutil.cpu_percent(interval=None),
            'ram': psutil.virtual_memory().percent,
            'process_ram': process.memory_info().rss / 1024 / 1024, # MB
            'uptime': int(time.time() - process.create_time()),
            'platform': f"{platform.system()} {platform.release()}",
            'python_version': platform.python_version()
        })
    except Exception as e:
        current_app.logger.error(f"Error getting system stats: {e}")
        return {'error': 'Failed to get stats'}, 500

@api.route('/servers', methods=['GET'])
def get_servers():
    snapshot = {
        'impostor': [
            {'roomId': rid, **info} for rid, info in public_servers['impostor'].items()
        ]
    }
    return jsonify({'servers': snapshot})

@api.route('/news', methods=['GET'])
def get_news():
    try:
        news = News.query.order_by(News.created_at.desc()).limit(20).all()
        return jsonify([n.to_dict() for n in news])
    except Exception as e:
        current_app.logger.error(f"Error fetching news: {e}")
        import traceback
        current_app.logger.error(traceback.format_exc())
        return {'error': 'Internal Server Error', 'details': str(e)}, 500

@api.route('/news', methods=['POST'])
def create_news():
    user_id = session.get('user_id')
    if not user_id:
        return {'ok': False, 'error': 'Unauthorized'}, 401
    
    user = User.query.get(user_id)
    admin_ids = current_app.config.get('ADMIN_IDS', [])
    if not user or (user.role != 'admin' and user.id not in admin_ids):
        return {'ok': False, 'error': 'Forbidden'}, 403

    data = request.get_json()
    if not data.get('title') or not data.get('content'):
        return {'ok': False, 'error': 'Missing fields'}, 400

    news_item = News(
        id=str(uuid.uuid4()),
        title=data['title'],
        content=data['content'],
        excerpt=data.get('excerpt'),
        author_id=user.id,
        author_name=user.username,
        category=data.get('category', 'announcement')
    )
    db.session.add(news_item)
    db.session.commit()
    return jsonify({'ok': True, 'news': news_item.to_dict()})

@api.route('/news/<news_id>', methods=['DELETE'])
def delete_news(news_id):
    user_id = session.get('user_id')
    if not user_id:
        return {'ok': False, 'error': 'Unauthorized'}, 401
    
    user = User.query.get(user_id)
    news_item = News.query.get(news_id)
    
    if not news_item:
        return {'ok': False, 'error': 'Not found'}, 404
        
    admin_ids = current_app.config.get('ADMIN_IDS', [])
    if user.role != 'admin' and user.id not in admin_ids and news_item.author_id != user.id:
        return {'ok': False, 'error': 'Forbidden'}, 403
        
    db.session.delete(news_item)
    db.session.commit()
    return {'ok': True}

@api.route('/news/<news_id>', methods=['PUT'])
def update_news(news_id):
    user_id = session.get('user_id')
    if not user_id:
        return {'ok': False, 'error': 'Unauthorized'}, 401
    
    user = User.query.get(user_id)
    news_item = News.query.get(news_id)
    
    if not news_item:
        return {'ok': False, 'error': 'Not found'}, 404
        
    admin_ids = current_app.config.get('ADMIN_IDS', [])
    if user.role != 'admin' and user.id not in admin_ids and news_item.author_id != user.id:
        return {'ok': False, 'error': 'Forbidden'}, 403
        
    data = request.get_json()
    if data.get('title'): news_item.title = data['title']
    if data.get('content'): news_item.content = data['content']
    if data.get('excerpt'): news_item.excerpt = data['excerpt']
    if data.get('category'): news_item.category = data['category']
    
    db.session.commit()
    return {'ok': True, 'news': news_item.to_dict()}

@api.route('/messages', methods=['GET'])
def get_messages():
    channel_id = request.args.get('channelId', 'general')
    msgs = Message.query.filter_by(channel_id=channel_id).order_by(Message.timestamp.desc()).limit(50).all()
    return jsonify([m.to_dict() for m in reversed(msgs)])

# --- Auth Routes ---
@auth.route('/discord')
def discord_auth():
    client_id = current_app.config['DISCORD_CLIENT_ID']
    redirect_uri = current_app.config['DISCORD_REDIRECT_URI']
    scope = 'identify'
    state = str(uuid.uuid4())
    session['oauth_state'] = state
    
    url = f"https://discord.com/api/oauth2/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code&scope={scope}&state={state}"
    return redirect(url)

@auth.route('/callback')
def discord_callback():
    code = request.args.get('code')
    state = request.args.get('state')
    error = request.args.get('error')
    
    frontend_url = current_app.config['FRONTEND_URL']
    
    if error:
        return redirect(f"{frontend_url}/?auth=error&error_code={error}")
    
    # Verify state (optional but recommended)
    # if state != session.get('oauth_state'):
    #    return redirect(f"{frontend_url}/?auth=error&error_code=invalid_state")
    
    data = {
        'client_id': current_app.config['DISCORD_CLIENT_ID'],
        'client_secret': current_app.config['DISCORD_CLIENT_SECRET'],
        'code': code,
        'grant_type': 'authorization_code',
        'redirect_uri': current_app.config['DISCORD_REDIRECT_URI']
    }
    
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    
    try:
        token_resp = requests.post('https://discord.com/api/oauth2/token', data=data, headers=headers)
        token_resp.raise_for_status()
        tokens = token_resp.json()
        
        user_resp = requests.get('https://discord.com/api/users/@me', headers={'Authorization': f"Bearer {tokens['access_token']}"})
        user_resp.raise_for_status()
        discord_user = user_resp.json()
        
        # Save/Update user
        user = User.query.get(discord_user['id'])
        role = 'user'
        admin_ids = current_app.config.get('ADMIN_IDS', [])
        if discord_user['id'] in admin_ids:
            role = 'admin'
            
        if not user:
            user = User(
                id=discord_user['id'],
                username=discord_user['username'],
                avatar=f"https://cdn.discordapp.com/avatars/{discord_user['id']}/{discord_user['avatar']}.png" if discord_user['avatar'] else None,
                role=role,
                status='online'
            )
        else:
            user.username = discord_user['username']
            user.avatar = f"https://cdn.discordapp.com/avatars/{discord_user['id']}/{discord_user['avatar']}.png" if discord_user['avatar'] else None
            # Don't overwrite role if already set in DB, unless it's the hardcoded admin
            if discord_user['id'] in admin_ids:
                user.role = 'admin'
        
        db.session.add(user)
        db.session.commit()
        
        session['user_id'] = user.id
        session['user_role'] = user.role
        
        return redirect(f"{frontend_url}/?auth=success")
        
    except Exception as e:
        return redirect(f"{frontend_url}/?auth=error&error_code=internal")

@auth.route('/user')
def get_current_user():
    user_id = session.get('user_id')
    if not user_id:
        return {'error': 'Not authenticated'}, 401
    
    user = User.query.get(user_id)
    if not user:
        return {'error': 'User not found'}, 404
        
    return jsonify(user.to_dict())

@auth.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return {'success': True}

