from flask import Blueprint, request, jsonify
from routes.generate import client
from pydantic import BaseModel
import json


question_bp= Blueprint('questions', __name__)

class QuestionFormat(BaseModel):
    question: str
    a: str
    b: str
    c: str
    d: str 
    answer: str

@question_bp.route('/', methods=['POST'])
def generate_question():
   # data= request.get_json()
    flower= "Tulip" #data['flower']
    
    if request.method == 'OPTIONS':
        return '', 200
    
    print("from next step :",flower)
    
    prompt = f""" 
        Given the flower name generate multiple choice questions with 4 options and the answer. Make exactly 10 questions. And make sure questions and answers are in the correct order.
        Consider this example for the Tulip:  
        Return text in JSON format.
        Output:
        {{
            "question": "What is the scientific name of the tulip?",
            "a": "Tulipa gesneriana",
            "b": "Tulipa sylvestris",
            "c": "Tulipa bakeri",
            "d": "Tulipa clusiana",
            "answer": "a"
       
            "question": "What is the natural habitat of Tulips?",
            "a": "Deserts",
            "b": "Wetlands",
            "c": "Mountainous regions",
            "d": "Tropical forests",
            "answer": "c"
        
            "question": "Which of the following is a common color for Tulips?",
            "a": "Purple",
            "b": "Black",
            "c": "Pink",
            "d": "Orange",
            "answer": "c"
       
            "question": "Tulips belong to which family of plants?",
            "a": "Asteraceae",
            "b": "Liliaceae",
            "c": "Rosaceae",
            "d": "Orchidaceae",
            "answer": "b"
        
            "question": "In which country is the Tulip most commonly associated with?",
            "a": "Japan",
            "b": "Netherlands",
            "c": "Italy",
            "d": "Canada",
            "answer": "b"
        
            "question": "Tulips are typically grown as which type of plant?",
            "a": "Annuals",
            "b": "Perennials",
            "c": "Biennials",
            "d": "Shrubs",
            "answer": "b"
        
            "question": "What part of the Tulip is typically planted to grow new flowers?",
            "a": "Leaves",
            "b": "Seeds",
            "c": "Bulbs",
            "d": "Stems",
            "answer": "c"
       
            "question": "Tulips are most commonly planted in which season?",
            "a": "Spring",
            "b": "Winter",
            "c": "Fall",
            "d": "Summer",
            "answer": "c"
        
            "question": "Which of these is a famous event that celebrates Tulips in the Netherlands?",
            "a": "Tulip Time Festival",
            "b": "Tulip Parade",
            "c": "Keukenhof Gardens Festival",
            "d": "Flower Power Show",
            "answer": "c"
        
            "question": "Tulips are known to be toxic to which type of animal?",
            "a": "Dogs",
            "b": "Cats",
            "c": "Horses",
            "d": "All of the above",
            "answer": "d"
        }}
        The input is: {{ "flower_name": "{flower}" }}
    """
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
        config={
        'response_mime_type': 'application/json',
        'response_schema': list[QuestionFormat],
    },
    )
    response_json = json.loads(response.text)
    return jsonify(response_json), 200