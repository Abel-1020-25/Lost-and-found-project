from flask import Flask, request, jsonify, send_from_directory
import sqlite3
import os

app = Flask(__name__, static_folder=".", static_url_path="")

DB_PATH = "lostfound.db"

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# ---------- FRONTEND ROUTES ----------

# Serve the landing page (index.html) at "/"
@app.route("/")
def index():
    # make sure index.html is in the SAME folder as app.py
    return send_from_directory("home", "index.html")

# Optional: serve other static pages directly if you open them by URL
# e.g. http://127.0.0.1:5000/search_item.html
@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(".", filename)

# ---------- API ROUTES FOR LOST ITEMS ----------

@app.route("/api/items", methods=["POST"])
def create_item():
    data = request.json

    conn = get_db()
    cur = conn.cursor()
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS lost_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_type TEXT,
            building TEXT,
            room TEXT,
            date_lost TEXT,
            time_lost TEXT,
            color TEXT,
            details TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
    )

    cur.execute(
        """
        INSERT INTO lost_items
        (item_type, building, room, date_lost, time_lost, color, details)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            data.get("item_type"),
            data.get("building"),
            data.get("room"),
            data.get("date_lost"),
            data.get("time_lost"),
            data.get("color"),
            data.get("details"),
        ),
    )

    conn.commit()
    conn.close()
    return jsonify({"status": "ok"}), 201


@app.route("/api/items", methods=["GET"])
def search_items():
    keywords = (request.args.get("keywords") or "").lower()

    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS lost_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_type TEXT,
            building TEXT,
            room TEXT,
            date_lost TEXT,
            time_lost TEXT,
            color TEXT,
            details TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
    )

    if keywords:
        like = f"%{keywords}%"
        cur.execute(
            """
            SELECT * FROM lost_items
            WHERE LOWER(
                item_type || ' ' || building || ' ' || room || ' ' ||
                color || ' ' || details
            ) LIKE ?
            ORDER BY created_at DESC
            """,
            (like,),
        )
    else:
        cur.execute(
            "SELECT * FROM lost_items ORDER BY created_at DESC"
        )

    rows = [dict(r) for r in cur.fetchall()]
    conn.close()
    return jsonify(rows)


if __name__ == "__main__":
    # host 0.0.0.0 is nice for Codespaces / containers
    app.run(host="0.0.0.0", port=5000, debug=True)
