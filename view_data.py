import sqlite3

conn = sqlite3.connect("database.db")
cur = conn.cursor()

print("USERS:")
for row in cur.execute("SELECT * FROM users"):
    print(row)

print("\nCART:")
for row in cur.execute("SELECT * FROM cart"):
    print(row)

conn.close()
