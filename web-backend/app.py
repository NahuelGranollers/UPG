from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_compress import Compress
from flask_socketio import SocketIO
from models import db
from config import Config
from routes import api, auth
from routes.bot import bot_bp
from socket_events import register_socket_events
import logging, os, sys

os.makedirs('logs', exist_ok=True)
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s', handlers=[logging.FileHandler('logs/app.log'), logging.StreamHandler()])
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
CORS(app, resources={r"/*": {"origins": Config.CORS_ORIGINS}}, supports_credentials=True)
Compress(app)
socketio = SocketIO(app, cors_allowed_origins=Config.CORS_ORIGINS, async_mode='eventlet')

app.register_blueprint(api)
app.register_blueprint(auth)
app.register_blueprint(bot_bp)
register_socket_events(socketio, app)

# Serve Xash3D assets
@app.route('/xash/<path:filename>')
def serve_xash(filename):
    # Adjust path relative to web-backend/ directory
    return send_from_directory('../public/xash', filename)

# Add COOP/COEP headers for WASM threading
@app.after_request
def add_security_headers(response):
    response.headers['Cross-Origin-Opener-Policy'] = 'same-origin'
    response.headers['Cross-Origin-Embedder-Policy'] = 'require-corp'
    return response

with app.app_context():
    db.create_all()
    logger.info("DB initialized")

@app.errorhandler(404)
def not_found(e):
    return {'error': 'Not found'}, 404

if __name__ == '__main__':
    port = Config.PORT
    logger.info(f"Starting SocketIO server on 0.0.0.0:{port}")
    logger.info(f"Architecture: i386 | Debian 12 | Python: {sys.version}")
    socketio.run(app, host='0.0.0.0', port=port, debug=False)

