import os, json
from dotenv import load_dotenv
load_dotenv()

from google import genai
from google.genai import types
from pydantic import BaseModel
from flask import Blueprint, request, jsonify
from flask_cors import cross_origin

overview_bp= Blueprint('overview', __name__)



api_key= os.getenv('GOOGLE_AI_API')
client = genai.Client(api_key=api_key)



class Description(BaseModel):
    overview: str
    description: str
    

@overview_bp.route('/', methods=['POST'])
@cross_origin(origins="http://localhost:3000/*")
def generate_question():
    data= request.get_json()
    flower= data['flower']
    if request.method == 'OPTIONS':
        return '', 200
    
    print("from next step :",flower)
    
    prompt = f""" 
        Given the flower name write an overview and description (make sure the description contains interesting and fun facts). 
        Consider this example for the sunflower:
        Return text in JSON format.
        Output:
        {{
            "overview": "The common sunflower (Helianthus annuus) is a species of large annual forb of the daisy family Asteraceae. "
            "The common sunflower is harvested for its edible oily seeds, which are often eaten as a snack food. "
            "They are also used in the production of cooking oil, as food for livestock, as bird food, "
            "and as plantings in domestic gardens for aesthetics.",
            
            "description": "The common sunflower is a tall, erect plant that can grow up to 3 meters (10 feet) in height. "
            "It has large, broad leaves that are arranged in a spiral pattern along the stem. "
            "Sunflowers can remove toxic elements from soils, like lead and uranium, and have been used in clean-up operations at both Chernobyl and Fukushima. "
            "As ornamentals, there are a wide variety of sunflower cultivars, including 'Aztec Sun', 'Mongolian Giant', and 'Teddy Bear'. "
            "Despite their name, sunflower seeds are actually the fruit of the sunflower, known as an 'achene'. "
            "The common sunflower is part of the Aster family, which also includes artichoke, lettuce, chamomile, and safflower. "
            "While they are famous for growing to tall heights, there are dwarf cultivars of sunflowers that are suitable for smaller spaces."
        }}

        Input: {{ "flower_name": "{flower}" }}
    """
    
    response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=prompt,
    config={
        'response_mime_type': 'application/json',
        'response_schema': list[Description],
    },
    )
    try:
        # Attempt to load the response text as JSON
        response_json = json.loads(response.text)
    except json.JSONDecodeError:
        # Handle the case where the response is not valid JSON
        return jsonify({"error": "Failed to decode response as JSON", "raw_response": response.text}), 500
    
    # Now return the response in JSON format
    return jsonify(response_json[0])