from flask import Flask
from flask_jsonpify import jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
@cross_origin()
def hello_world():
    return jsonify({'test':'yes'})

if __name__ == '__main__':
  app.run(port=5000)
