from flask import Blueprint, request, jsonify

from models import db
from models import CookieClickerProgress
from flask import session
from flask import Blueprint, request, jsonify
import re

cookie_clicker_bp = Blueprint('cookie_clicker', __name__)

def sanitize_discord_id(discord_id):
    return bool(re.match(r'^[0-9]{15,20}$', str(discord_id)))

@cookie_clicker_bp.route('/api/cookie-clicker/progress', methods=['GET'])
def get_progress():
    discord_id = session.get('discord_id')
    if not discord_id or not sanitize_discord_id(discord_id):
        return jsonify({'error': 'Invalid or missing Discord session'}), 401
    try:
        progress = CookieClickerProgress.query.filter_by(discord_id=discord_id).first()
        return jsonify({'count': progress.count if progress else 0})
    except Exception as e:
        return jsonify({'error': 'Database error', 'details': str(e)}), 500

@cookie_clicker_bp.route('/api/cookie-clicker/progress', methods=['POST'])
def save_progress():
    discord_id = session.get('discord_id')
    if not discord_id or not sanitize_discord_id(discord_id):
        return jsonify({'error': 'Invalid or missing Discord session'}), 401
    data = request.get_json()
    count = data.get('count', 0)
    try:
        count = int(count)
        if count < 0 or count > 1000000:
            return jsonify({'error': 'Invalid count value'}), 400
    except Exception:
        return jsonify({'error': 'Count must be an integer'}), 400
    try:
        progress = CookieClickerProgress.query.filter_by(discord_id=discord_id).first()
        if not progress:
            progress = CookieClickerProgress(discord_id=discord_id, count=count)
            db.session.add(progress)
        else:
            progress.count = count
        db.session.commit()
        return jsonify({'ok': True, 'count': progress.count})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Database error', 'details': str(e)}), 500
