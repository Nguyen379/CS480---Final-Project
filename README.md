# Feelosophy - Facial Emotion Detection

Feelosophy is a web application that uses advanced computer vision and machine learning to detect and analyze human emotions in real-time from webcam feeds. The application utilizes a Vision Transformer (ViT) model to recognize facial expressions and classify them into seven basic emotions.

## Features

- Real-time emotion detection from webcam
- Powered by a pre-trained Vision Transformer (ViT) model
- Privacy-focused with local processing
- Visual representation of emotion confidence levels
- Responsive design for desktop and mobile

## Tech Stack

- **Frontend**: React, Vite
- **Backend**: Flask (Python)
- **ML Model**: Hugging Face's transformer model ("trpakov/vit-face-expression")

## Prerequisites

- Node.js (v16+)
- Python (v3.8+)
- Pip (Python package manager)

## Installation and Setup

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a virtual environment:

```bash
python -m venv .venv
```

3. Activate the virtual environment:

   - On Windows: `.venv\Scripts\activate`
   - On macOS/Linux: `source .venv/bin/activate`

4. Install dependencies:

```bash
pip install -r requirements.txt
```

5. Start the backend server:

```bash
python app.py
```

The server will run on http://localhost:3000

### Frontend Setup

1. Install dependencies:

```bash
npm install
npm install lucide-react
```

2. Start the development server:

```bash
npm run dev
```

The app will be available at http://localhost:5173 (or the port specified by Vite)

## Using the Application

1. Open your browser and navigate to the local development server URL
2. Click the "Open Camera" button and allow camera permissions
3. Position your face within the camera view
4. Click "Detect Emotion" to analyze your facial expression
5. View the results showing your primary emotion and confidence levels

## Project Structure

```
├── backend/              # Python backend
│   ├── app.py            # Flask API server
│   ├── requirements.txt  # Python dependencies
├── public/               # Static assets
├── src/
│   ├── components/       # React components
│   ├── services/         # API services
│   ├── App.css           # Main styles
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Entry point
├── package.json          # Node.js dependencies
└── vite.config.js        # Vite configuration
```

## About the Model and Dataset

The dataset is taken from: https://www.kaggle.com/datasets/msambare/fer2013
The project uses this model: https://huggingface.co/trpakov/vit-face-expression

This project uses the "trpakov/vit-face-expression" model from Hugging Face, which is a Vision Transformer (ViT) fine-tuned on the FER2013 dataset. It can recognize seven emotions:

- Happy
- Sad
- Angry
- Surprised
- Neutral
- Fearful
- Disgusted

## Troubleshooting

- **Camera not appearing**: Ensure you've granted camera permissions in your browser
- **Backend connection issues**: Verify the backend server is running on port 3000
- **Model loading errors**: The first time you run the backend, it may take a few minutes to download the model files

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributors

- Ritika
- Anna
- Nguyen
- Harold
