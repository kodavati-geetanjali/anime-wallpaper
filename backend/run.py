from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

from app.routes import routes

app.register_blueprint(routes)

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)