
from app import app, db
from models import Message

with app.app_context():
    print("Checking messages in DB...")
    count = Message.query.count()
    print(f"Total messages: {count}")
    
    msgs = Message.query.order_by(Message.timestamp.desc()).limit(5).all()
    for m in msgs:
        print(f"ID: {m.id}, Channel: {m.channel_id}, Content: {m.content}, Time: {m.timestamp}")
