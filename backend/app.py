from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import base64
import io
import numpy as np
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the model and processor once when the app starts
print("Loading model 1...")
first_processor = AutoImageProcessor.from_pretrained("trpakov/vit-face-expression")
first_model = AutoModelForImageClassification.from_pretrained("trpakov/vit-face-expression")
print("Model 1 loaded!")

print("Loading model 2...")
second_model = load_model(
    "/Users/thucanh/Desktop/face_classification-master/trained_models/fer2013_mini_XCEPTION.119-0.65.hdf5",
    compile=False    
)
second_model_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']
print("Model 2 loaded!")

def preprocess_input(x, v2=True):
    x = x.astype('float32')
    x = x / 255.0
    if v2:
        x = x - 0.5
        x = x * 2.0
    return x

def preprocess_model2(image):
    image = image.convert("L").resize((48,48))
    image_array = np.array(image).astype("float32") / 255.0
    image_array = preprocess_input(image_array, v2=True)
    image_array = np.expand_dims(image_array, axis=0)
    image_array = np.expand_dims(image_array, axis=-1)
    return image_array

@app.route('/detect', methods=['POST'])
def detect_emotion():
    try:
        # Get the base64 image from the request
        data = request.json
        image_data = data.get('image')
        model_choice = data.get('model')
        
        if 'image' not in data:
            return jsonify({"error": "No image provided"}), 400
        
        # Decode the base64 image
        image_data = data['image'].split(',')[1] if ',' in data['image'] else data['image']
        image = Image.open(io.BytesIO(base64.b64decode(image_data)))
        
        # First model prediction
        if model_choice == "Model 1: trpakov/vit-face-expression":
            # Process the image and get predictions
            first_inputs = first_processor(images=image, return_tensors="pt")
            with torch.no_grad():
                first_outputs = first_model(**first_inputs)
                first_logits = first_outputs.logits
            # Get predicted class and confidences
            predicted_class_idx = first_logits.argmax(-1).item()
            first_scores = torch.nn.functional.softmax(first_logits, dim=-1)[0].tolist()
            # Get all class names with their confidence scores
            first_results = []
            for idx, score in enumerate(first_scores):
                emotion = first_model.config.id2label[idx]
                first_results.append({
                    "emotion": emotion.capitalize(),
                    "confidence": score
                })
            # Sort by confidence in descending order
            first_results.sort(key=lambda x: x["confidence"], reverse=True)
            results = first_results

        
        elif model_choice == "Model 2: orriaga-model":
            # Second model prediction
            second_model_inputs = preprocess_model2(image)
            second_preds = second_model.predict(second_model_inputs)[0]
            second_results = [{
                "emotion": second_model_labels[i],
                "confidence": float(score)
            } for i, score in enumerate(second_preds)]
            second_results.sort(key=lambda x: x["confidence"], reverse=True)
            results = second_results
        else:
            return jsonify({"error": "Invalid model choice"}), 400
        
        # Format the response
        return jsonify({
            "primaryEmotion": results[0]["emotion"],
            "confidence": results[0]["confidence"] * 100,
            "allResults": results
        })    
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3000)