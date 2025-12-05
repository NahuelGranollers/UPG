import sqlite3
import os

# Determine DB path
basedir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(basedir, 'instance', 'database.sqlite')

# If instance folder doesn't exist, check root
if not os.path.exists(db_path):
    db_path = os.path.join(basedir, 'database.sqlite')

print(f"Checking DB at {db_path}")

if not os.path.exists(db_path):
    print("DB file not found! Skipping migration (will be created by app).")
    exit(0)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

try:
    print("Adding reactions column to messages table...")
    cursor.execute("ALTER TABLE messages ADD COLUMN reactions TEXT DEFAULT '{}'")
    conn.commit()
    print("Column added successfully.")
except sqlite3.OperationalError as e:
    if "duplicate column name" in str(e):
        print("Column already exists.")
    else:
        print(f"Error: {e}")

conn.close()
