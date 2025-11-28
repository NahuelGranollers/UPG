
import sqlite3
import os

paths = [
    '/home/nahuel/web-backend/database.sqlite',
    '/home/nahuel/web-backend/instance/database.sqlite'
]

for db_path in paths:
    print(f"\nChecking DB at {db_path}")
    if not os.path.exists(db_path):
        print("DB file not found!")
        continue

    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        print("Tables:")
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        for table in tables:
            print(table)

        print("Columns in messages:")
        try:
            cursor.execute("PRAGMA table_info(messages)")
            columns = cursor.fetchall()
            for col in columns:
                print(col)
        except Exception as e:
            print(f"Error checking columns: {e}")
            
        conn.close()
    except Exception as e:
        print(f"Error connecting: {e}")
