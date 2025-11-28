from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
db = SQLAlchemy()
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.String(100), primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    avatar = db.Column(db.String(255))
    color = db.Column(db.String(20), default='#5865F2')
    score = db.Column(db.Integer, default=0)
    role = db.Column(db.String(20), default='user')
    status = db.Column(db.String(20), default='offline')
    verified = db.Column(db.Boolean, default=False)
    last_seen = db.Column(db.DateTime, default=datetime.utcnow)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'avatar': self.avatar,
            'color': self.color,
            'score': self.score,
            'role': self.role,
            'status': self.status,
            'verified': self.verified,
            'lastSeen': self.last_seen.isoformat() if self.last_seen else None
        }

class News(db.Model):
    __tablename__ = 'news'
    id = db.Column(db.String(100), primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    excerpt = db.Column(db.Text)
    author_id = db.Column(db.String(100), nullable=False)
    author_name = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(255))
    category = db.Column(db.String(50), default='announcement')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'excerpt': self.excerpt,
            'authorId': self.author_id,
            'authorName': self.author_name,
            'imageUrl': self.image_url,
            'category': self.category,
            'createdAt': self.created_at.isoformat() + 'Z' if self.created_at else None
        }

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.String(100), primary_key=True)
    channel_id = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(100), nullable=False)
    avatar = db.Column(db.String(255))
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    is_system = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'channelId': self.channel_id,
            'userId': self.user_id,
            'username': self.username,
            'avatar': self.avatar,
            'content': self.content,
            'timestamp': self.timestamp.isoformat(),
            'isSystem': self.is_system
        }

