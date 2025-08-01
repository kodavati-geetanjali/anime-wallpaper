from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

from app.routes import routes

app.register_blueprint(routes)

if __name__ == '__main__':
    app.run(debug=True)