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

# Allow all origins with credentials support
def allow_all_origins(origin):
    return True

CORS(app, resources={r"/*": {"origins": r"https?://.*"}}, supports_credentials=True)
Compress(app)
socketio = SocketIO(app, cors_allowed_origins=allow_all_origins, async_mode='eventlet')

app.register_blueprint(api)
app.register_blueprint(auth)
app.register_blueprint(bot_bp)
register_socket_events(socketio, app)

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

