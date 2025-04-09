from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
from dotenv import load_dotenv
import io

from routes.generate import question_bp

load_dotenv()




app = Flask(__name__)

app.register_blueprint(question_bp, url_prefix='/generate')

# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Load the pre-trained model
try:
    model = load_model('model.h5')
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# Define image size expected by your model (assuming the model takes 224x224 input)
IMG_SIZE = (64, 64)

def prepare_image(img):
    """Preprocess the image for the model."""
    # Ensure the image is in RGB format (if not, convert it)
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Resize the image to the size expected by the model
    img = img.resize(IMG_SIZE)
    
    # Convert the image to a numpy array
    img_array = np.array(img)
    
    # Normalize the image (important: check if your model was trained with normalized data)
    img_array = img_array / 255.0  # Normalize to [0, 1] range
    
    # Expand the dimensions to match the model input format (batch size dimension)
    img_array = np.expand_dims(img_array, axis=0)
    
    # Make sure the image is in the correct type (float32 for TensorFlow models)
    img_array = img_array.astype('float32')
    
    return img_array

@app.route('/classify', methods=['POST'])
def classify_image():
    """Classify the uploaded image using the trained model."""
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        # Read the image from the uploaded file
        img = Image.open(io.BytesIO(file.read()))
        
        # Preprocess the image
        img_array = prepare_image(img)
        
        # Debug: Print the shape of the image array
        print("Image array shape:", img_array.shape)
        
        # Predict the class
        predictions = model.predict(img_array)
        
        # Debug: Print predictions to check what the model returns
        print("Model predictions:", predictions)
        
        # Assuming your model has multiple classes, get the predicted class
        predicted_class = np.argmax(predictions)
        class_names = {0: 'Daisy', 1: 'Dandelion', 2: 'Rose', 3: 'SunFlower', 4: 'Tulip'}

        
        # Return the result (you can return more info like confidence if needed)
        return jsonify({'predicted_class': class_names[int(predicted_class)]}), 200
    
    except Exception as e:
        # Log the exception to the console
        print(f"Error during classification: {e}")
        # Return a more detailed error message
        return jsonify({'error': f'Internal Server Error: {str(e)}'}), 500

@app.before_request
def handle_preflight():
    """Handle CORS preflight request for OPTIONS method"""
    if request.method == 'OPTIONS':
        # Respond to preflight request with an empty 200 response
        return jsonify({'message': 'CORS preflight successful'}), 200


if __name__ == '__main__':
    app.run(debug=True)
