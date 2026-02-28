# Smart Crop Advisory System

A comprehensive web-based platform for farmers to get intelligent insights on crop recommendations, yield prediction, and disease detection.

## Features

*   **Crop Recommendation:** Suggests the best crop based on soil and weather conditions (N, P, K, pH, etc.) using a Random Forest model.
*   **Yield Prediction:** Estimates crop yield (Tons) based on Crop Type and Land Area using real-world data (FAO Stats).
*   **Disease Detection:** Identifies crop diseases from images using YOLO and ResNet models.
*   **E-commerce Store:** Buy seeds and fertilizers.
*   **Chatbot:** AI-powered assistant for farming queries.

## Tech Stack

*   **Frontend:** React, Vite, TailwindCSS (Port 5173)
*   **Backend:** Node.js, Express, MongoDB (Port 5000)
*   **ML Service:** Python, FastAPI, PyTorch, Scikit-learn (Port 8001)

## Setup Instructions

### Prerequisites
*   Node.js & npm
*   Python 3.8+
*   MongoDB Instance (Atlas or Local)
*   Kaggle API Credentials (for downloading datasets if needed)

### 1. Machine Learning Service
```bash
cd ml_service
pip install -r requirements.txt
python setup_datasets.py  # Download datasets
python train_models.py    # Train models
python app.py             # Start Service on Port 8001
```

### 2. Backend
```bash
cd backend
npm install
# Configure .env file with MONGO_URI, etc.
node server.js            # Start Backend on Port 5000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev               # Start Client on Port 5173
```

## Yield Prediction Limitations
The **Yield Prediction** model is trained on real-world data (FAO Stat). Currently, it supports the following crops with high confidence:
*   Rice
*   Maize
*   Banana (Plantain)
*   Cassava, Potatoes, Sorghum, Soybeans, Wheat, Yams

*Note: Other crops may return an error or require dataset expansion.*

## API Endpoints
*   `POST /api/ml/recommend` - recommend crop
*   `POST /api/ml/yield` - predict yield
*   `POST /api/ml/disease` - detect disease
*   `GET /api/weather` - get weather info
