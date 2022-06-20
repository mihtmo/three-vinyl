import psycopg2
import os
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api', methods=['GET'])
def index():
    
    # Establish connection with Heroku PostgreSQL
    DATABASE_URL = os.environ.get('DATABASE_URL')
    
    conn = None
    
    try:
        # Establish database connection
        conn = psycopg2.connect(DATABASE_URL)

        # Create cursor
        cur = conn.cursor()

        cur.execute("SELECT (date::VARCHAR(19)), temp_hi, temp_lo, rain FROM weatherdata")
        weatherData = jsonify(cur.fetchall())
    
        
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed')
            
    return weatherData