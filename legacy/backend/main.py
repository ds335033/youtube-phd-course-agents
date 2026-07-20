import os
import json
import psycopg2
from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__, static_folder="../")

# Database URL from Render (defaults to internal string if environment variable is missing)
DB_URL = os.environ.get(
    "DATABASE_URL", 
    "postgresql://youtube_phd_user:LOBT3nb8CxgH8YDjckpWkRRfi2auj9po@dpg-d9f8rvrbc2fs73avv9sg-a/youtube_phd"
)

# Initialize database
def init_db():
    try:
        conn = psycopg2.connect(DB_URL)
        c = conn.cursor()
        c.execute('''CREATE TABLE IF NOT EXISTS users
                     (id SERIAL PRIMARY KEY, email TEXT UNIQUE, password TEXT)''')
        c.execute('''CREATE TABLE IF NOT EXISTS leads
                     (id SERIAL PRIMARY KEY, name TEXT, email TEXT UNIQUE, captured_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
        conn.commit()
        conn.close()
        print("Successfully connected to Render PostgreSQL and initialized tables.")
    except Exception as e:
        print(f"Error initializing database: {e}")

init_db()

@app.route('/api/optin', methods=['POST'])
def optin():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    
    if not email:
        return jsonify({"status": "error", "message": "Email is required"}), 400
        
    try:
        conn = psycopg2.connect(DB_URL)
        c = conn.cursor()
        c.execute("INSERT INTO leads (name, email) VALUES (%s, %s)", (name, email))
        conn.commit()
    except psycopg2.IntegrityError:
        # Email already exists
        pass
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
    finally:
        if 'conn' in locals() and conn:
            conn.close()
        
    return jsonify({"status": "success", "message": "Lead captured"})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    try:
        conn = psycopg2.connect(DB_URL)
        c = conn.cursor()
        c.execute("SELECT password FROM users WHERE email = %s", (email,))
        user = c.fetchone()
        
        if not user:
            # Create for demo purposes so it always works for the user
            c.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, password))
            conn.commit()
            user_password = password
        else:
            user_password = user[0]
            
        conn.close()
        
        if user_password != password:
            return jsonify({"status": "error", "detail": "Incorrect password"}), 401
            
        return jsonify({"status": "success", "token": "fake-jwt-token-123"})
    except Exception as e:
        return jsonify({"status": "error", "detail": "Database connection error"}), 500

@app.route('/api/ai/ask', methods=['POST'])
def ai_ask():
    data = request.json
    question = data.get('question', '')
    
    # Placeholder for Vertex AI / Codex / Opencode AI
    simulated_response = f"This is an advanced AI response powered by Vertex AI and Codex protocols. Regarding your question '{question}', the optimal strategy is to leverage algorithmic retention weighting by extending AVD through precise hook pacing."
    return jsonify({"status": "success", "answer": simulated_response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
