import sqlite3

conn = sqlite3.connect("database.db")
cur = conn.cursor()



cur.execute(
    "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
    (1, 101, 2)
)

cur.execute(
    "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
    (1, 102, 1)
)

conn.commit()
conn.close()

print("Cart data inserted")
