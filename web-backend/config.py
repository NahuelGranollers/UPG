import os
from dotenv import load_dotenv
load_dotenv()
class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///database.sqlite'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    PORT = 5000
    DEBUG = False
    CORS_ORIGINS = [
        'https://unaspartidillas.online', 
        'https://www.unaspartidillas.online',
        'http://localhost:3000', 
        'http://localhost:5173'
    ]
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-super-secret-key-change-this')
    
    # Discord Auth
    DISCORD_CLIENT_ID = os.getenv('DISCORD_CLIENT_ID')
    DISCORD_CLIENT_SECRET = os.getenv('DISCORD_CLIENT_SECRET')
    DISCORD_REDIRECT_URI = os.getenv('DISCORD_REDIRECT_URI')
    FRONTEND_URL = os.getenv('FRONTEND_URL', 'https://unaspartidillas.online')
    
    # Session Config
    SESSION_COOKIE_SAMESITE = 'None'
    SESSION_COOKIE_SECURE = True
    
    # Admin
    ADMIN_IDS = ['368377018372456459']
    
    # AI
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

