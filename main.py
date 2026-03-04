import sqlite3
import os
import webbrowser

DB_NAME = "database.db"

def connect():
    return sqlite3.connect(DB_NAME)

def validate_user(username, password):
    conn = connect()
    cur = conn.cursor()
    cur.execute(
        "SELECT id FROM users WHERE username=? AND password=?",
        (username, password)
    )
    result = cur.fetchone()
    conn.close()
    return result

def fetch_products():
    conn = connect()
    cur = conn.cursor()
    cur.execute("SELECT id, name, price FROM products")
    products = cur.fetchall()
    conn.close()
    return products

def add_to_cart(user_id, product_id):
    conn = connect()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)",
        (user_id, product_id)
    )
    conn.commit()
    conn.close()
    
def register_user(username, password):
    conn = connect()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            (username, password)
        )
        conn.commit()
        return True
    except sqlite3.IntegrityError:
        return False
    finally:
        conn.close()


if __name__ == "__main__":
    file_path = os.path.abspath(os.path.join("ui", "login.html"))
    webbrowser.open("file://" + file_path)

