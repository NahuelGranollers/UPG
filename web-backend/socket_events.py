from flask import request
from flask_socketio import emit, join_room, leave_room, disconnect
from models import db, User, Message
from game_state import (
    connected_users, voice_states, impostor_rooms, cs16_rooms, 
    public_servers, user_room_map, trolled_users, ADMIN_DISCORD_ID, BOT_USER,
    IMPOSTOR_WORDS, IMPOSTOR_CATEGORIES
)
import logging
import uuid
from datetime import datetime
import random
import time
import html
import os
import google.generativeai as genai

logger = logging.getLogger(__name__)

def uwuify(text):
    t = str(text)
    return f"UwU {t.replace('r', 'w').replace('l', 'w').replace('R', 'W').replace('L', 'W')} UwU"

def meowify(text):
    t = str(text)
    return f"~m~ {t.replace('?', '? meow').replace('!', '! meow')} ~m~"

def kawaiify(text):
    t = str(text)
    return f"♡ {t.replace('.', ' ✨').replace('!', '!!! ✨')} ♡"

def apply_troll_transform(user_id, text):
    mode = trolled_users.get(user_id)
    if not mode: return text
    try:
        if mode == 'uwu': return uwuify(text)
        if mode == 'meow': return meowify(text)
        if mode == 'kawaii': return kawaiify(text)
        return text
    except:
        return text

def register_socket_events(socketio, app=None):
    # Configure Gemini
    api_key = os.getenv('GEMINI_API_KEY')
    model = None
    if api_key:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.0-flash')
    else:
        logger.warning("GEMINI_API_KEY not found, bot will not work")

    def handle_bot_response(channel_id, user_name, user_message):
        if not model: return
        try:
            prompt = f"Eres UPG Bot, el bot más tóxico, agresivo y vacilón de la comunidad 'Unas Partidillas'. Tu objetivo es insultar (sin ser racista ni homófobo), burlarte y humillar al usuario {user_name} que te ha dicho: '{user_message}'. No seas amable, sé cruel, sarcástico y usa insultos fuertes de gamer. Si te preguntan quién eres, di que eres su peor pesadilla digital."
            response = model.generate_content(prompt)
            text = response.text
            
            if text:
                if app:
                    with app.app_context():
                        bot_msg = Message(
                            id=str(uuid.uuid4()),
                            channel_id=channel_id,
                            user_id='bot',
                            username='UPG',
                            avatar=BOT_USER['avatar'],
                            content=text,
                            timestamp=datetime.utcnow(),
                            is_system=False
                        )
                        db.session.add(bot_msg)
                        db.session.commit()
                        socketio.emit('message:received', bot_msg.to_dict(), room=channel_id)
                else:
                    logger.error("App context missing in handle_bot_response - Message NOT saved to DB")
                    # Fallback without DB save if app context missing
                    bot_msg_dict = {
                        'id': str(uuid.uuid4()),
                        'channelId': channel_id,
                        'userId': 'bot',
                        'username': 'UPG',
                        'avatar': BOT_USER['avatar'],
                        'content': text,
                        'timestamp': datetime.utcnow().isoformat(),
                        'isSystem': False
                    }
                    socketio.emit('message:received', bot_msg_dict, room=channel_id)

        except Exception as e:
            logger.error(f"Bot error: {e}")
            error_msg = {
                'id': str(uuid.uuid4()),
                'channelId': channel_id,
                'userId': 'bot',
                'username': 'UPG',
                'avatar': BOT_USER['avatar'],
                'content': '¡Ups! Mis circuitos se han cruzado. Inténtalo de nuevo más tarde. 🤖💥',
                'timestamp': datetime.utcnow().isoformat(),
                'isSystem': False
            }
            socketio.emit('message:received', error_msg, room=channel_id)
    
    @socketio.on('connect')
    def on_connect():
        logger.info(f"Client connected: {request.sid}")

    @socketio.on('disconnect')
    def on_disconnect():
        logger.info(f"Client disconnected: {request.sid}")
        user = connected_users.get(request.sid)
        if user:
            del connected_users[request.sid]
            
            # Voice cleanup
            if request.sid in voice_states:
                del voice_states[request.sid]
                socketio.emit('voice:state', get_global_voice_state())

            # Impostor cleanup
            cleanup_impostor_player(user['id'], user['username'])
            
            # CS16 cleanup
            cleanup_cs16_player(user['id'])

            socketio.emit('user:offline', {'userId': user['id']})
            socketio.emit('users:list', list(connected_users.values()))

    @socketio.on('user:join')
    def on_user_join(user_data):
        role = 'user'
        if user_data.get('id') == ADMIN_DISCORD_ID:
            role = 'admin'
        else:
            db_user = User.query.get(user_data.get('id'))
            if db_user:
                role = db_user.role

        final_user = user_data.copy()
        final_user.update({
            'role': role,
            'socketId': request.sid,
            'online': True
        })
        
        connected_users[request.sid] = final_user
        
        if not final_user['id'].startswith('guest-'):
            # Save to DB
            u = User.query.get(final_user['id'])
            if not u:
                u = User(id=final_user['id'], username=final_user['username'], avatar=final_user['avatar'])
            else:
                u.username = final_user['username']
                u.avatar = final_user['avatar']
            u.role = role
            u.status = 'online'
            u.last_seen = datetime.utcnow()
            db.session.add(u)
            db.session.commit()

        emit('user:registered', final_user)
        socketio.emit('user:online', final_user)
        emit('users:list', list(connected_users.values()))

    @socketio.on('message:send')
    def on_message_send(data):
        content = data.get('content', '').strip()
        if not content:
            logger.warning(f"Empty message attempt from {data.get('userId')}")
            return {'ok': False, 'error': 'empty_message'}
        
        # Sanitize
        content = html.escape(content)
        
        # Troll transform
        content = apply_troll_transform(data.get('userId'), content)
        
        msg_id = str(uuid.uuid4())
        timestamp = datetime.utcnow()
        
        msg = Message(
            id=msg_id,
            channel_id=data.get('channelId'),
            user_id=data.get('userId'),
            username=data.get('username'),
            avatar=data.get('avatar'),
            content=content,
            timestamp=timestamp,
            is_system=False
        )
        db.session.add(msg)
        db.session.commit()
        
        msg_data = msg.to_dict()
        msg_data['localId'] = data.get('localId')
        
        socketio.emit('message:received', msg_data, room=data.get('channelId'))
        
        # Bot ping
        if content == '/ping':
            bot_msg = Message(
                id=str(uuid.uuid4()),
                channel_id=data.get('channelId'),
                user_id='bot',
                username='UPG Bot',
                avatar=BOT_USER['avatar'],
                content='Pong! 🏓',
                timestamp=datetime.utcnow(),
                is_system=False
            )
            db.session.add(bot_msg)
            db.session.commit()
            socketio.emit('message:received', bot_msg.to_dict(), room=data.get('channelId'))

        # Bot AI
        if '@upg' in content.lower():
            socketio.start_background_task(handle_bot_response, data.get('channelId'), data.get('username'), content)

        return {'ok': True, 'messageId': msg_id}

    @socketio.on('channel:join')
    def on_channel_join(data):
        channel = data.get('channelId', 'general')
        join_room(channel)
        msgs = Message.query.filter_by(channel_id=channel).order_by(Message.timestamp.desc()).limit(50).all()
        emit('channel:history', {
            'channelId': channel,
            'messages': [m.to_dict() for m in reversed(msgs)]
        })

    # --- Voice ---
    @socketio.on('voice:join')
    def on_voice_join(data):
        logger.info(f"Voice join/switch: {request.sid} -> {data}")
        channel_id = data.get('channelId')
        prev_channel = voice_states.get(request.sid)
        
        if prev_channel:
            leave_room(f"voice:{prev_channel}")
        
        if channel_id:
            voice_states[request.sid] = channel_id
            join_room(f"voice:{channel_id}")
        else:
            if request.sid in voice_states:
                del voice_states[request.sid]
        
        socketio.emit('voice:state', get_global_voice_state())

    @socketio.on('voice:leave')
    def on_voice_leave(data):
        logger.info(f"Voice leave: {request.sid}")
        prev_channel = voice_states.get(request.sid)
        if prev_channel:
            leave_room(f"voice:{prev_channel}")
            del voice_states[request.sid]
        
        socketio.emit('voice:state', get_global_voice_state())

    @socketio.on('voice:signal')
    def on_voice_signal(data):
        to_user_id = data.get('toUserId')
        # Find socket for target
        target_sid = None
        for sid, user in connected_users.items():
            if user['id'] == to_user_id:
                target_sid = sid
                break
        
        if target_sid:
            sender = connected_users.get(request.sid)
            socketio.emit('voice:signal', {
                'fromUserId': sender['id'] if sender else None,
                'data': data.get('data')
            }, room=target_sid)

    # --- Impostor Game ---
    @socketio.on('impostor:create-room')
    def on_impostor_create(data):
        room_id = data.get('roomId')
        user_id = data.get('userId')
        if not room_id or not user_id: return {'ok': False}
        
        if room_id in impostor_rooms: return {'ok': False, 'error': 'exists'}
        
        impostor_rooms[room_id] = {
            'hostId': user_id,
            'players': {user_id: {'socketId': request.sid, 'username': data.get('username')}},
            'started': False,
            'customWords': [],
            'name': data.get('name', f"Sala de {data.get('username')}"),
            'password': data.get('password'),
            'createdAt': datetime.utcnow().isoformat()
        }
        
        public_servers['impostor'][room_id] = {
            'name': impostor_rooms[room_id]['name'],
            'hostId': user_id,
            'hostName': data.get('username'),
            'playerCount': 1,
            'maxPlayers': 10,
            'hasPassword': bool(data.get('password')),
            'gameState': {'started': False}
        }
        
        join_room(f"impostor:{room_id}")
        broadcast_servers(socketio)
        
        emit('impostor:room-state', {
            'roomId': room_id,
            'hostId': user_id,
            'players': [{'id': user_id, 'username': data.get('username')}],
            'started': False,
            'customWords': [],
            'name': impostor_rooms[room_id]['name'],
            'hasPassword': bool(impostor_rooms[room_id]['password'])
        })
        return {'ok': True, 'roomId': room_id}

    @socketio.on('impostor:join-room')
    def on_impostor_join(data):
        room_id = data.get('roomId')
        user_id = data.get('userId')
        room = impostor_rooms.get(room_id)
        
        if not room: 
            logger.warning(f"Impostor join failed: Room {room_id} not found")
            return {'ok': False, 'error': 'not_found'}
        if room['started']: 
            logger.warning(f"Impostor join failed: Room {room_id} already started")
            return {'ok': False, 'error': 'started'}
        if room['password'] and room['password'] != data.get('password'):
            logger.warning(f"Impostor join failed: Wrong password for room {room_id}")
            return {'ok': False, 'error': 'wrong_password'}
            
        room['players'][user_id] = {'socketId': request.sid, 'username': data.get('username')}
        public_servers['impostor'][room_id]['playerCount'] = len(room['players'])
        
        join_room(f"impostor:{room_id}")
        broadcast_servers(socketio)
        
        players_list = [{'id': pid, 'username': p['username']} for pid, p in room['players'].items()]
        socketio.emit('impostor:room-state', {
            'roomId': room_id,
            'hostId': room['hostId'],
            'players': players_list,
            'started': room['started'],
            'customWords': room['customWords'],
            'name': room['name'],
            'hasPassword': bool(room['password'])
        }, room=f"impostor:{room_id}")
        
        return {'ok': True, 'roomId': room_id}

    @socketio.on('impostor:start')
    def on_impostor_start(data):
        room_id = data.get('roomId')
        room = impostor_rooms.get(room_id)
        if not room or room['hostId'] != data.get('hostId'): return {'ok': False}
        
        category = data.get('category', 'General')
        words = IMPOSTOR_CATEGORIES.get(category, IMPOSTOR_WORDS) + room['customWords']
        word = random.choice(words)
        
        player_ids = list(room['players'].keys())
        if len(player_ids) < 2: return {'ok': False, 'error': 'not_enough_players'}
        
        impostor_id = random.choice(player_ids)
        room['started'] = True
        room['word'] = word
        room['impostorId'] = impostor_id
        room['voting'] = False
        room['votes'] = {}
        room['revealedInnocents'] = set()
        
        for pid, p in room['players'].items():
            role = 'impostor' if pid == impostor_id else 'crewmate'
            assigned_word = None if pid == impostor_id else word
            socketio.emit('impostor:assign', {'role': role, 'word': assigned_word}, room=p['socketId'])
            
        socketio.emit('impostor:started', {
            'roomId': room_id, 
            'started': True,
            'category': category
        }, room=f"impostor:{room_id}")
        
        return {'ok': True}

    @socketio.on('impostor:start-voting')
    def on_impostor_start_voting(data):
        room_id = data.get('roomId')
        room = impostor_rooms.get(room_id)
        if not room or room['hostId'] != data.get('hostId'): return {'ok': False}
        if not room['started']: return {'ok': False, 'error': 'not_started'}
        
        room['voting'] = True
        room['votes'] = {}
        socketio.emit('impostor:voting-start', {'roomId': room_id}, room=f"impostor:{room_id}")
        return {'ok': True}

    @socketio.on('impostor:cast-vote')
    def on_impostor_cast_vote(data):
        room_id = data.get('roomId')
        voter_id = data.get('voterId')
        voted_id = data.get('votedId')
        
        room = impostor_rooms.get(room_id)
        if not room or not room['voting']: return {'ok': False, 'error': 'not_voting'}
        if voter_id in room.get('revealedInnocents', set()): return {'ok': False, 'error': 'dead_cannot_vote'}
        
        room['votes'][voter_id] = voted_id
        
        counts = {}
        for target in room['votes'].values():
            if target:
                counts[target] = counts.get(target, 0) + 1
                
        socketio.emit('impostor:voting-update', {
            'roomId': room_id,
            'counts': counts,
            'totalVotes': len(room['votes'])
        }, room=f"impostor:{room_id}")
        return {'ok': True}

    @socketio.on('impostor:end-voting')
    def on_impostor_end_voting(data):
        room_id = data.get('roomId')
        room = impostor_rooms.get(room_id)
        if not room or room['hostId'] != data.get('hostId'): return {'ok': False}
        if not room['voting']: return {'ok': False, 'error': 'not_voting'}
        
        counts = {}
        for target in room['votes'].values():
            if target:
                counts[target] = counts.get(target, 0) + 1
        
        max_votes = 0
        top_candidate = None
        for pid, count in counts.items():
            if count > max_votes:
                max_votes = count
                top_candidate = pid
            elif count == max_votes:
                top_candidate = None # Tie
        
        room['voting'] = False
        eliminated_name = None
        was_impostor = False
        
        if top_candidate:
            eliminated_name = room['players'][top_candidate]['username']
            was_impostor = (top_candidate == room['impostorId'])
            
            if was_impostor:
                room['started'] = False
                room['word'] = None
                room['impostorId'] = None
            else:
                if 'revealedInnocents' not in room: room['revealedInnocents'] = set()
                room['revealedInnocents'].add(top_candidate)
        
        socketio.emit('impostor:voting-result', {
            'roomId': room_id,
            'counts': counts,
            'eliminated': eliminated_name,
            'wasImpostor': was_impostor
        }, room=f"impostor:{room_id}")
        
        players_list = []
        for pid, p in room['players'].items():
            players_list.append({
                'id': pid,
                'username': p['username'],
                'revealedInnocent': pid in room.get('revealedInnocents', set())
            })
            
        socketio.emit('impostor:room-state', {
            'roomId': room_id,
            'hostId': room['hostId'],
            'players': players_list,
            'started': room['started'],
            'customWords': room['customWords'],
            'name': room['name'],
            'hasPassword': bool(room['password'])
        }, room=f"impostor:{room_id}")
        
        return {'ok': True, 'eliminated': eliminated_name, 'wasImpostor': was_impostor}

    @socketio.on('impostor:restart')
    def on_impostor_restart(data):
        room_id = data.get('roomId')
        room = impostor_rooms.get(room_id)
        if not room or room['hostId'] != data.get('hostId'): return {'ok': False}
        
        room['started'] = False
        room['word'] = None
        room['impostorId'] = None
        room['voting'] = False
        room['votes'] = {}
        room['revealedInnocents'] = set()
        
        socketio.emit('impostor:restarted', {'roomId': room_id}, room=f"impostor:{room_id}")
        
        players_list = [{'id': pid, 'username': p['username'], 'revealedInnocent': False} for pid, p in room['players'].items()]
        socketio.emit('impostor:room-state', {
            'roomId': room_id,
            'hostId': room['hostId'],
            'players': players_list,
            'started': room['started'],
            'customWords': room['customWords'],
            'name': room['name'],
            'hasPassword': bool(room['password'])
        }, room=f"impostor:{room_id}")
        return {'ok': True}

    @socketio.on('impostor:add-word')
    def on_impostor_add_word(data):
        room_id = data.get('roomId')
        word = data.get('word')
        room = impostor_rooms.get(room_id)
        if not room: return {'ok': False}
        
        if word and word.strip():
            room['customWords'].append(word.strip())
            socketio.emit('impostor:room-state', {
                'roomId': room_id,
                'hostId': room['hostId'],
                'players': [{'id': pid, 'username': p['username']} for pid, p in room['players'].items()],
                'started': room['started'],
                'customWords': room['customWords'],
                'name': room['name'],
                'hasPassword': bool(room['password'])
            }, room=f"impostor:{room_id}")
        return {'ok': True}

    @socketio.on('impostor:leave-room')
    def on_impostor_leave(data):
        room_id = data.get('roomId')
        user_id = data.get('userId')
        room = impostor_rooms.get(room_id)
        if not room: return {'ok': False}
        
        if user_id in room['players']:
            username = room['players'][user_id]['username']
            cleanup_impostor_player(user_id, username)
            return {'ok': True}
        return {'ok': False}

    @socketio.on('impostor:guess-word')
    def on_impostor_guess(data):
        room_id = data.get('roomId')
        user_id = data.get('userId')
        guess = data.get('guess', '').strip().lower()
        
        room = impostor_rooms.get(room_id)
        if not room or not room['started']: return {'ok': False}
        if user_id != room['impostorId']: return {'ok': False, 'error': 'not_impostor'}
        
        target_word = room['word'].lower()
        
        # Simple check
        if guess == target_word:
            winner = 'impostor'
        else:
            winner = 'crewmates'
            
        room['started'] = False
        room['word'] = None
        room['impostorId'] = None
        
        socketio.emit('impostor:game-over', {
            'roomId': room_id,
            'winner': winner,
            'word': target_word,
            'guess': guess,
            'impostorName': room['players'][user_id]['username']
        }, room=f"impostor:{room_id}")
        
        return {'ok': True}

    @socketio.on('impostor:reveal-all')
    def on_impostor_reveal_all(data):
        room_id = data.get('roomId')
        room = impostor_rooms.get(room_id)
        if not room or room['hostId'] != data.get('hostId'): return {'ok': False}
        
        players_roles = {}
        for pid in room['players']:
            players_roles[pid] = 'impostor' if pid == room['impostorId'] else 'crewmate'
            
        socketio.emit('impostor:reveal-all', {
            'roomId': room_id,
            'players': players_roles
        }, room=f"impostor:{room_id}")
        return {'ok': True}

    # --- CS 1.6 Game ---
    @socketio.on('cs16:create-room')
    def on_cs16_create(data):
        room_id = data.get('roomId')
        user_id = data.get('userId')
        if not room_id or not user_id: return {'ok': False}
        if room_id in cs16_rooms: return {'ok': False, 'error': 'exists'}
        
        cs16_rooms[room_id] = {
            'hostId': user_id,
            'players': {
                user_id: {
                    'socketId': request.sid, 
                    'username': data.get('username'),
                    'position': {'x': 0, 'y': 0, 'z': 0},
                    'rotation': {'x': 0, 'y': 0, 'z': 0},
                    'health': 100,
                    'team': 'counter-terrorist',
                    'isAlive': True
                }
            },
            'bots': {},
            'gameState': {
                'gameStarted': False,
                'bombPlanted': False,
                'bombDefused': False,
                'winner': None
            },
            'name': data.get('name', f"Sala CS16 de {data.get('username')}"),
            'password': data.get('password'),
            'createdAt': datetime.utcnow().isoformat()
        }
        
        # Initialize bots
        bot_count = data.get('botCount', 0)
        for i in range(bot_count):
            bot_id = f"bot_{i}_{int(time.time())}"
            cs16_rooms[room_id]['bots'][bot_id] = {
                'id': bot_id,
                'username': f"Bot {i+1}",
                'isBot': True,
                'position': {'x': 0, 'y': 0, 'z': 0},
                'rotation': {'x': 0, 'y': 0, 'z': 0},
                'health': 100,
                'team': 'terrorist',
                'isAlive': True
            }

        public_servers['cs16'][room_id] = {
            'name': cs16_rooms[room_id]['name'],
            'hostId': user_id,
            'hostName': data.get('username'),
            'playerCount': 1,
            'maxPlayers': 10,
            'hasPassword': bool(data.get('password')),
            'gameState': {'started': False},
            'botCount': bot_count
        }
        
        join_room(f"cs16:{room_id}")
        broadcast_servers(socketio)
        
        socketio.emit('cs16:room-state', {
            'roomId': room_id,
            'hostId': user_id,
            'players': [{'id': pid, **p} for pid, p in cs16_rooms[room_id]['players'].items()],
            'bots': [{'id': bid, **b} for bid, b in cs16_rooms[room_id]['bots'].items()],
            'gameState': cs16_rooms[room_id]['gameState']
        }, room=f"cs16:{room_id}")
        
        return {'ok': True, 'roomId': room_id}

    @socketio.on('cs16:join-room')
    def on_cs16_join(data):
        room_id = data.get('roomId')
        user_id = data.get('userId')
        room = cs16_rooms.get(room_id)
        
        if not room: 
            logger.warning(f"CS16 join failed: Room {room_id} not found")
            return {'ok': False, 'error': 'not_found'}
        if room['password'] and room['password'] != data.get('password'):
            logger.warning(f"CS16 join failed: Wrong password for room {room_id}")
            return {'ok': False, 'error': 'wrong_password'}
        if len(room['players']) >= 10: 
            logger.warning(f"CS16 join failed: Room {room_id} full")
            return {'ok': False, 'error': 'full'}
            
        room['players'][user_id] = {
            'socketId': request.sid, 
            'username': data.get('username'),
            'position': {'x': 0, 'y': 0, 'z': 0},
            'rotation': {'x': 0, 'y': 0, 'z': 0},
            'health': 100,
            'team': 'counter-terrorist',
            'isAlive': True
        }
        
        public_servers['cs16'][room_id]['playerCount'] = len(room['players'])
        
        join_room(f"cs16:{room_id}")
        broadcast_servers(socketio)
        
        socketio.emit('cs16:player-joined', {
            'userId': user_id,
            'username': data.get('username'),
            'position': {'x': 0, 'y': 0, 'z': 0}
        }, room=f"cs16:{room_id}")
        
        socketio.emit('cs16:room-state', {
            'roomId': room_id,
            'hostId': room['hostId'],
            'players': [{'id': pid, **p} for pid, p in room['players'].items()],
            'bots': [{'id': bid, **b} for bid, b in room['bots'].items()],
            'gameState': room['gameState']
        }, room=request.sid)
        
        return {'ok': True, 'roomId': room_id}

    @socketio.on('cs16:leave-room')
    def on_cs16_leave(data):
        room_id = data.get('roomId')
        user_id = data.get('userId')
        room = cs16_rooms.get(room_id)
        if not room: return {'ok': False}
        
        if user_id in room['players']:
            del room['players'][user_id]
            leave_room(f"cs16:{room_id}")
            
            if not room['players']:
                del cs16_rooms[room_id]
                if room_id in public_servers['cs16']:
                    del public_servers['cs16'][room_id]
            else:
                if room['hostId'] == user_id:
                    room['hostId'] = next(iter(room['players']))
                    public_servers['cs16'][room_id]['hostName'] = room['players'][room['hostId']]['username']
                
                public_servers['cs16'][room_id]['playerCount'] = len(room['players'])
                socketio.emit('cs16:player-left', {'userId': user_id}, room=f"cs16:{room_id}")
            
            broadcast_servers(socketio)
        return {'ok': True}

    @socketio.on('cs16:start-game')
    def on_cs16_start(data):
        room_id = data.get('roomId')
        room = cs16_rooms.get(room_id)
        if not room or room['hostId'] != data.get('hostId'): return {'ok': False}
        
        room['gameState']['gameStarted'] = True
        room['gameState']['bombPlanted'] = False
        room['gameState']['winner'] = None
        
        # Reset players
        for p in room['players'].values():
            p['health'] = 100
            p['isAlive'] = True
            p['position'] = {'x': 0, 'y': 0, 'z': 0}
            
        # Reset bots
        for b in room['bots'].values():
            b['health'] = 100
            b['isAlive'] = True
            b['position'] = {'x': 0, 'y': 0, 'z': 0}
            
        public_servers['cs16'][room_id]['gameState']['started'] = True
        broadcast_servers(socketio)
        
        socketio.emit('cs16:game-update', {'gameState': room['gameState']}, room=f"cs16:{room_id}")
        return {'ok': True}

    @socketio.on('cs16:player-move')
    def on_cs16_move(data):
        room_id = data.get('roomId')
        user_id = data.get('userId')
        room = cs16_rooms.get(room_id)
        if room and user_id in room['players']:
            player = room['players'][user_id]
            player['position'] = data.get('position')
            player['rotation'] = data.get('rotation')
            socketio.emit('cs16:player-update', {
                'userId': user_id,
                'position': player['position'],
                'rotation': player['rotation']
            }, room=f"cs16:{room_id}", include_self=False)

    @socketio.on('cs16:player-action')
    def on_cs16_action(data):
        room_id = data.get('roomId')
        action = data.get('action')
        if action == 'shoot':
            socketio.emit('cs16:player-shoot', {'userId': data.get('userId')}, room=f"cs16:{room_id}", include_self=False)

    @socketio.on('cs16:player-hit')
    def on_cs16_hit(data):
        room_id = data.get('roomId')
        target_id = data.get('targetId')
        damage = data.get('damage')
        
        room = cs16_rooms.get(room_id)
        if room:
            # Update health if it's a player
            if target_id in room['players']:
                room['players'][target_id]['health'] -= damage
                if room['players'][target_id]['health'] <= 0:
                    room['players'][target_id]['isAlive'] = False
                    
            # Update health if it's a bot
            elif target_id in room['bots']:
                room['bots'][target_id]['health'] -= damage
                if room['bots'][target_id]['health'] <= 0:
                    room['bots'][target_id]['isAlive'] = False
            
            socketio.emit('cs16:player-hit', data, room=f"cs16:{room_id}")

    @socketio.on('cs16:bomb-planted')
    def on_cs16_bomb_planted(data):
        room_id = data.get('roomId')
        room = cs16_rooms.get(room_id)
        if room:
            room['gameState']['bombPlanted'] = True
            socketio.emit('cs16:bomb-planted', data, room=f"cs16:{room_id}")

    @socketio.on('cs16:bomb-defused')
    def on_cs16_bomb_defused(data):
        room_id = data.get('roomId')
        room = cs16_rooms.get(room_id)
        if room:
            room['gameState']['bombDefused'] = True
            room['gameState']['winner'] = 'counter-terrorist'
            socketio.emit('cs16:bomb-defused', data, room=f"cs16:{room_id}")

    # --- Admin Events ---
    @socketio.on('admin:clear-channel')
    def on_admin_clear_channel(data):
        admin_id = data.get('adminId')
        channel_id = data.get('channelId')
        if not is_admin(admin_id): return
        
        Message.query.filter_by(channel_id=channel_id).delete()
        db.session.commit()
        socketio.emit('channel:history', {'channelId': channel_id, 'messages': []}, room=channel_id)

    @socketio.on('admin:clear-all-messages')
    def on_admin_clear_all(data):
        admin_id = data.get('adminId')
        if not is_admin(admin_id): return
        
        Message.query.delete()
        db.session.commit()
        socketio.emit('channel:history', {'channelId': None, 'messages': []})

    @socketio.on('admin:ban-user')
    def on_admin_ban(data):
        admin_id = data.get('adminId')
        user_id = data.get('userId')
        if not is_admin(admin_id): return
        
        # Implement ban logic (e.g. add to banned table)
        socketio.emit('admin:user-banned', {'userId': user_id, 'username': data.get('username')})
        
        # Disconnect user
        for sid, u in list(connected_users.items()):
            if u['id'] == user_id:
                disconnect(sid)

    @socketio.on('admin:kick-user')
    def on_admin_kick(data):
        admin_id = data.get('adminId')
        user_id = data.get('userId')
        if not is_admin(admin_id): return
        
        socketio.emit('admin:user-kicked', {'userId': user_id, 'username': data.get('username')})
        for sid, u in list(connected_users.items()):
            if u['id'] == user_id:
                disconnect(sid)

    @socketio.on('admin:delete-message')
    def on_admin_delete_message(data):
        admin_id = data.get('adminId')
        message_id = data.get('messageId')
        channel_id = data.get('channelId')
        if not is_admin(admin_id): return
        
        Message.query.filter_by(id=message_id).delete()
        db.session.commit()
        
        msgs = Message.query.filter_by(channel_id=channel_id).order_by(Message.timestamp.desc()).limit(50).all()
        socketio.emit('channel:history', {
            'channelId': channel_id,
            'messages': [m.to_dict() for m in reversed(msgs)]
        }, room=channel_id)

    @socketio.on('admin:silence-user')
    def on_admin_silence(data):
        if not is_admin(data.get('adminId')): return
        socketio.emit('admin:user-silenced', {'userId': data.get('userId')})

    @socketio.on('admin:change-color')
    def on_admin_change_color(data):
        if not is_admin(data.get('adminId')): return
        user_id = data.get('userId')
        color = data.get('color')
        
        user = User.query.get(user_id)
        if user:
            user.color = color
            db.session.commit()
            
        socketio.emit('user:color-changed', {'userId': user_id, 'color': color})
        socketio.emit('user:profile-updated', {'id': user_id, 'color': color})

    @socketio.on('admin:troll-mode')
    def on_admin_troll_mode(data):
        if not is_admin(data.get('adminId')): return
        user_id = data.get('userId')
        mode = data.get('mode')
        
        if mode:
            trolled_users[user_id] = mode
        elif user_id in trolled_users:
            del trolled_users[user_id]
            
        socketio.emit('admin:troll-mode-updated', {'userId': user_id, 'mode': mode})

    @socketio.on('admin:trigger-effect')
    def on_admin_trigger_effect(data):
        if not is_admin(data.get('adminId')): return
        user_id = data.get('userId')
        effect = data.get('effect')
        
        # Find the socket ID for the target user
        target_sid = None
        for sid, user in connected_users.items():
            if user['id'] == user_id:
                target_sid = sid
                break
        
        if target_sid:
            socketio.emit('admin:effect-triggered', {'effect': effect}, room=target_sid)

    def is_admin(user_id):
        if user_id == ADMIN_DISCORD_ID: return True
        # Check session or DB if needed, but socket doesn't have easy access to session
        # For now rely on ID check or if we passed a token
        return False

    # Helper functions
    def get_global_voice_state():
        state = {}
        for sid, cid in voice_states.items():
            user = connected_users.get(sid)
            if user:
                state[user['id']] = cid
        return state

    def broadcast_servers(sio):
        snapshot = {
            'impostor': [
                {'roomId': rid, **info} for rid, info in public_servers['impostor'].items()
            ],
            'cs16': [
                {'roomId': rid, **info} for rid, info in public_servers['cs16'].items()
            ]
        }
        sio.emit('servers:updated', {'servers': snapshot})

    def cleanup_impostor_player(user_id, username):
        for room_id, room in list(impostor_rooms.items()):
            if user_id in room['players']:
                del room['players'][user_id]
                if not room['players']:
                    del impostor_rooms[room_id]
                    if room_id in public_servers['impostor']:
                        del public_servers['impostor'][room_id]
                else:
                    if room['hostId'] == user_id:
                        room['hostId'] = next(iter(room['players']))
                        public_servers['impostor'][room_id]['hostName'] = room['players'][room['hostId']]['username']
                    
                    public_servers['impostor'][room_id]['playerCount'] = len(room['players'])
                    
                    socketio.emit('impostor:player-left', {'roomId': room_id, 'username': username}, room=f"impostor:{room_id}")
                    
                    players_list = [{'id': pid, 'username': p['username']} for pid, p in room['players'].items()]
                    socketio.emit('impostor:room-state', {
                        'roomId': room_id,
                        'hostId': room['hostId'],
                        'players': players_list,
                        'started': room['started'],
                        'customWords': room['customWords']
                    }, room=f"impostor:{room_id}")
                
                broadcast_servers(socketio)

    def cleanup_cs16_player(user_id):
        for room_id, room in list(cs16_rooms.items()):
            if user_id in room['players']:
                del room['players'][user_id]
                leave_room(f"cs16:{room_id}")
                
                if not room['players']:
                    del cs16_rooms[room_id]
                    if room_id in public_servers['cs16']:
                        del public_servers['cs16'][room_id]
                else:
                    if room['hostId'] == user_id:
                        room['hostId'] = next(iter(room['players']))
                        public_servers['cs16'][room_id]['hostName'] = room['players'][room['hostId']]['username']
                    
                    public_servers['cs16'][room_id]['playerCount'] = len(room['players'])
                    socketio.emit('cs16:player-left', {'userId': user_id}, room=f"cs16:{room_id}")
                
                broadcast_servers(socketio)
