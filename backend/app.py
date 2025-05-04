from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import base64
import io
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the model and processor once when the app starts
print("Loading model...")
processor = AutoImageProcessor.from_pretrained("trpakov/vit-face-expression")
model = AutoModelForImageClassification.from_pretrained("trpakov/vit-face-expression")
print("Model loaded!")

@app.route('/detect', methods=['POST'])
def detect_emotion():
    try:
        # Get the base64 image from the request
        data = request.json
        if 'image' not in data:
            return jsonify({"error": "No image provided"}), 400
        
        # Decode the base64 image
        image_data = data['image'].split(',')[1] if ',' in data['image'] else data['image']
        image = Image.open(io.BytesIO(base64.b64decode(image_data)))
        
        # Process the image and get predictions
        inputs = processor(images=image, return_tensors="pt")
        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits
        
        # Get predicted class and confidences
        predicted_class_idx = logits.argmax(-1).item()
        scores = torch.nn.functional.softmax(logits, dim=-1)[0].tolist()
        
        # Get all class names with their confidence scores
        results = []
        for idx, score in enumerate(scores):
            emotion = model.config.id2label[idx]
            results.append({
                "emotion": emotion.capitalize(),
                "confidence": score
            })
        
        # Sort by confidence in descending order
        results.sort(key=lambda x: x["confidence"], reverse=True)
        
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