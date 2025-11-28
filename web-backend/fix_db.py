
import sqlite3
import os

db_path = '/home/nahuel/web-backend/instance/database.sqlite'
print(f"Fixing DB at {db_path}")

if not os.path.exists(db_path):
    print("DB file not found!")
    exit(1)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

print("Dropping messages table...")
cursor.execute("DROP TABLE IF EXISTS messages")
conn.commit()
print("Messages table dropped. Restart the server to recreate it.")

conn.close()
