from flask import Flask, jsonify, request, abort, current_app
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS, cross_origin
from werkzeug.exceptions import HTTPException
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, support_credentials=True)

db = SQLAlchemy()
migrate = Migrate(app, db)

class Faq(db.Model):
    __tablename__ = 'faq'

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String())
    answer = db.Column(db.String())
    fruit_id = db.Column(db.Integer, db.ForeignKey('fruit.id'), nullable=False)

class Fruit(db.Model):
    __tablename__ = 'fruit'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    image = db.Column(db.String(), nullable=False)
    faqs = db.relationship('Faq', backref='fruit', lazy=True)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.errorhandler(Exception)
def handle_exception(e):
    if isinstance(e, HTTPException):
        return jsonify(error=str(e)), e.code
    return jsonify(error="Internal Server Error"), 500

@app.route("/")
@cross_origin(supports_credentials=True)
def hello():
    return "Hello world!"

@app.route("/faqs", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_faqs():
    try:
        faqs = Faq.query.all()
        faqs_list = []
        for faq in faqs:
            faqs_list.append({
                'id': faq.id,
                'question': faq.question,
                'answer': faq.answer,
                'fruit_id': faq.fruit_id
            })
        return jsonify(faqs_list)
    except Exception as e:
        return handle_exception(e)

@app.route("/faqs/<int:id>", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_faq(id):
    try:
        faq = Faq.query.get_or_404(id)
        return jsonify({
            'id': faq.id,
            'question': faq.question,
            'answer': faq.answer,
            'fruit_id': faq.fruit_id
        })
    except Exception as e:
        print(e)
        return handle_exception(e)

@app.route("/faqs", methods=["POST"])
@cross_origin(supports_credentials=True)
def create_faq():
    try:
        data = request.get_json()
        print(data)
        if not data or not 'question' in data or not 'answer' in data or not 'fruit_id' in data:
            return jsonify(error="Invalid input"), 400
        new_faq = Faq(question=data['question'], answer=data['answer'], fruit_id=data['fruit_id'])
        db.session.add(new_faq)
        db.session.commit()
        return jsonify({
            'id': new_faq.id,
            'question': new_faq.question,
            'answer': new_faq.answer,
            'fruit_id': new_faq.fruit_id
        }), 201
    except Exception as e:
        return handle_exception(e)

@app.route("/faqs/<int:id>", methods=["PUT"])
def update_faq(id):
    try:
        faq = Faq.query.get_or_404(id)
        data = request.get_json()
        if not data or not 'question' in data or not 'answer' in data or not 'fruit_id' in data:
            return jsonify(error="Invalid input"), 400
        faq.question = data['question']
        faq.answer = data['answer']
        faq.fruit_id = data['fruit_id']
        db.session.commit()
        return jsonify({
            'id': faq.id,
            'question': faq.question,
            'answer': faq.answer,
            'fruit_id': faq.fruit_id
        })
    except Exception as e:
        return handle_exception(e)

@app.route("/faqs/<int:id>", methods=["DELETE"])
@cross_origin(supports_credentials=True)
def delete_faq(id):
    try:
        faq = Faq.query.get_or_404(id)
        db.session.delete(faq)
        db.session.commit()
        return '', 204
    except Exception as e:
        return handle_exception(e)

@app.route("/fruits", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_fruits():
    try:
        fruits = Fruit.query.all()
        fruits_list = []
        for fruit in fruits:
            fruits_list.append({
                'id': fruit.id,
                'name': fruit.name,
                'image': fruit.image
            })
        return jsonify(fruits_list)
    except Exception as e:
        return handle_exception(e)

@app.route("/fruits", methods=["POST"])
@cross_origin(supports_credentials=True)
def create_fruit():
    try:
        data = request.get_json()
        if not data or not 'name' in data or not 'image' in data:
            return jsonify(error="Invalid input"), 400
        new_fruit = Fruit(name=data['name'], image=data['image'])
        db.session.add(new_fruit)
        db.session.commit()
        return jsonify({
            'id': new_fruit.id,
            'name': new_fruit.name,
            'image': new_fruit.image
        }), 201
    except Exception as e:
        return handle_exception(e)

if __name__ == "__main__":
    app.run(port=5500)