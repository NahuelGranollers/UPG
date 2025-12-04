from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_compress import Compress
from flask_socketio import SocketIO
from models import db
from config import Config
from routes import api, auth
from routes.api import api as servers_api
from routes.bot import bot_bp
from socket_events import register_socket_events
import logging, os, sys

os.makedirs('logs', exist_ok=True)

# Configure logging with UTF-8 encoding for Windows compatibility
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# File handler (always UTF-8)
file_handler = logging.FileHandler('logs/app.log', encoding='utf-8')
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))

# Stream handler with error handling for Windows console
stream_handler = logging.StreamHandler(sys.stdout)
stream_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))

# Add filter to handle Unicode encoding errors
class UnicodeFilter(logging.Filter):
    def filter(self, record):
        try:
            record.getMessage()
            return True
        except UnicodeEncodeError:
            # Replace problematic characters
            record.msg = str(record.msg).encode('ascii', 'replace').decode('ascii')
            return True

stream_handler.addFilter(UnicodeFilter())
logger.addHandler(file_handler)
logger.addHandler(stream_handler)

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

# Allow all origins with credentials support
def allow_all_origins(origin):
    return True

from flask_cors import CORS
CORS(app, resources={r"/*": {"origins": Config.CORS_ORIGINS}}, supports_credentials=True)
Compress(app)
socketio = SocketIO(app, cors_allowed_origins=Config.CORS_ORIGINS, async_mode=None)

@app.after_request
def set_security_headers(response):
    # CSP que permite tu aplicación
    response.headers['Content-Security-Policy'] = (
        "default-src 'self'; "
        "script-src 'self' 'unsafe-inline' https://cdn.socket.io https://static.cloudflareinsights.com; "
        "style-src 'self' 'unsafe-inline'; "
        "img-src 'self' data: https:; "
        "connect-src 'self' https://api.unaspartidillas.online wss://api.unaspartidillas.online https://static.cloudflareinsights.com; "
        "font-src 'self' data:; "
        "frame-ancestors 'self'"
    )
    
    # Otros headers de seguridad recomendados
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    
    return response

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

