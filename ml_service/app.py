# import os
# import io
# import torch
# import torch.nn as nn
# from torchvision import transforms, models
# from ultralytics import YOLO
# from fastapi import FastAPI, File, UploadFile, HTTPException, Body
# from fastapi.middleware.cors import CORSMiddleware
# from PIL import Image
# import numpy as np
# import joblib
# import json
# import yaml

# app = FastAPI(title="Smart Crop Advisory ML Service")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Global variables for models
# models_loaded = {}

# # Paths
# MODELS_DIR = 'models'

# def load_models():
#     print("Loading models...")
    
#     # 1. Load Crop Recommendation Model
#     try:
#         models_loaded['crop_rec'] = joblib.load(os.path.join(MODELS_DIR, 'crop_recommendation_model.pkl'))
#         print("Crop Recommendation model loaded.")
#     except Exception as e:
#         print(f"Error loading Crop Rec model: {e}")

#     # 2. Load Yield Prediction Model
#     try:
#         models_loaded['yield_model'] = joblib.load(os.path.join(MODELS_DIR, 'yield_model.pkl'))
#         models_loaded['yield_le'] = joblib.load(os.path.join(MODELS_DIR, 'yield_label_encoder.pkl'))
#         print("Yield Prediction model loaded.")
#     except Exception as e:
#         print(f"Error loading Yield model: {e}")

#     # 3. Load YOLO Model (Disease)
#     try:
#         yolo_path = os.path.join(MODELS_DIR, 'yolov11_inspired_detector.pt')
#         if os.path.exists(yolo_path):
#             models_loaded['yolo'] = YOLO(yolo_path)
#             # Load class names from yaml if possible, or use model names
#             models_loaded['yolo_classes'] = models_loaded['yolo'].names
#             print("YOLO model loaded.")
#         else:
#             print("YOLO model file not found.")
#     except Exception as e:
#         print(f"Error loading YOLO model: {e}")

#     # 4. Load CNN Model (Disease)
#     try:
#         cnn_path = os.path.join(MODELS_DIR, 'cnn_resnet18_final.pth')
#         if os.path.exists(cnn_path):
#             checkpoint = torch.load(cnn_path, map_location='cpu')
            
#             # Reconstruct model architecture (ResNet18)
#             cnn_model = models.resnet18(weights=None)
#             num_features = cnn_model.fc.in_features
            
#             # Match the architecture from previous backend.py
#             class_names = checkpoint.get('class_names', [])
#             cnn_model.fc = nn.Sequential(
#                 nn.Linear(num_features, 512),
#                 nn.ReLU(),
#                 nn.Dropout(0.3),
#                 nn.Linear(512, len(class_names))
#             )
            
#             cnn_model.load_state_dict(checkpoint.get('model_state_dict', {}))
#             cnn_model.eval()
            
#             models_loaded['cnn'] = cnn_model
#             models_loaded['cnn_classes'] = class_names
#             print("CNN model loaded.")
#         else:
#             print("CNN model file not found.")
#     except Exception as e:
#         print(f"Error loading CNN model: {e}")

# @app.on_event("startup")
# async def startup_event():
#     load_models()

# @app.get("/health")
# def health():
#     return {"status": "running", "models": list(models_loaded.keys())}


# # --- Endpoints ---

# class CropRecInput(dict):
#     # N, P, K, temperature, humidity, ph, rainfall
#     pass

# @app.post("/recommend_crop")
# async def recommend_crop(data: dict = Body(...)):
#     if 'crop_rec' not in models_loaded:
#         raise HTTPException(status_code=503, detail="Model not loaded")

#     try:
#         # Expected keys: N, P, K, temperature, humidity, ph, rainfall
#         features = [[
#             data.get('N'),
#             data.get('P'),
#             data.get('K'),
#             data.get('temperature'),
#             data.get('humidity'),
#             data.get('ph'),
#             data.get('rainfall')
#         ]]

#         prediction = models_loaded['crop_rec'].predict(features)
#         return {"recommended_crop": prediction[0]}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))


# # Mapping from Frontend Crop names (lowercase) to Dataset Crop names
# # Extended Mapping: ML Supported + Heuristic fallbacks
# YIELD_CROP_MAPPING = {
#     # ML Supported (Keys must match frontend value)
#     'rice': {'name': 'Rice, paddy', 'source': 'ml'},
#     'maize': {'name': 'Maize', 'source': 'ml'},
#     'banana': {'name': 'Plantains and others', 'source': 'ml'},
#     'potato': {'name': 'Potatoes', 'source': 'ml'},
#     'wheat': {'name': 'Wheat', 'source': 'ml'},
#     'soybean': {'name': 'Soybeans', 'source': 'ml'},
#     'sorghum': {'name': 'Sorghum', 'source': 'ml'},
#     'cassava': {'name': 'Cassava', 'source': 'ml'},
#     'sweet potato': {'name': 'Sweet potatoes', 'source': 'ml'},
#     'yam': {'name': 'Yams', 'source': 'ml'},

#     # Heuristic/Average Yields (Tons per Hectare global avg approx)
#     # Source: Estimations based on FAO/Indiastat averages for fallback
#     'apple': {'avg_yield': 30.0, 'source': 'heuristic'},
#     'orange': {'avg_yield': 25.0, 'source': 'heuristic'},
#     'mango': {'avg_yield': 8.5, 'source': 'heuristic'},
#     'grapes': {'avg_yield': 20.0, 'source': 'heuristic'},
#     'watermelon': {'avg_yield': 30.0, 'source': 'heuristic'},
#     'muskmelon': {'avg_yield': 20.0, 'source': 'heuristic'},
#     'papaya': {'avg_yield': 60.0, 'source': 'heuristic'},
#     'coconut': {'avg_yield': 5.0, 'source': 'heuristic'}, # Nuts converted to tons roughly
#     'cotton': {'avg_yield': 2.5, 'source': 'heuristic'},
#     'jute': {'avg_yield': 2.8, 'source': 'heuristic'},
#     'coffee': {'avg_yield': 0.8, 'source': 'heuristic'},
#     'groundnut': {'avg_yield': 1.6, 'source': 'heuristic'},
#     'chickpea': {'avg_yield': 1.0, 'source': 'heuristic'},
#     'pomegranate': {'avg_yield': 12.0, 'source': 'heuristic'},
#     'lentil': {'avg_yield': 1.2, 'source': 'heuristic'},
#     'mungbean': {'avg_yield': 0.9, 'source': 'heuristic'},
#     'blackgram': {'avg_yield': 0.8, 'source': 'heuristic'}
# }

# @app.post("/predict_yield")
# async def predict_yield(data: dict = Body(...)):
#     try:
#         crop_id = data.get('crop').lower()
#         area_acres = float(data.get('area'))
        
#         crop_info = YIELD_CROP_MAPPING.get(crop_id)
        
#         if not crop_info:
#              # Fallback generic
#              crop_info = {'avg_yield': 2.0, 'source': 'heuristic_generic'}

#         predicted_yield_tons = 0.0

#         # Conversion: 1 Acre = 0.404686 Hectare
#         area_hectares = area_acres * 0.404686

#         if crop_info['source'] == 'ml':
#             try:
#                 if 'yield_model' not in models_loaded:
#                     raise HTTPException(status_code=503, detail="ML Model not loaded")
                
#                 le = models_loaded['yield_le']
#                 model = models_loaded['yield_model']
                
#                 # Handle both older numpy-array-based encoders and sklearn's LabelEncoder
#                 if hasattr(le, "classes_"):
#                     # Standard sklearn LabelEncoder instance
#                     classes = le.classes_
#                 else:
#                     # Backward compatibility: saved as a raw numpy array
#                     classes = np.array(le)

#                 dataset_name = crop_info['name']
                
#                 if dataset_name in classes:
#                     # Find index
#                     crop_encoded = np.where(classes == dataset_name)[0][0]
#                     features = [[crop_encoded]]
#                     pred_hg_ha = model.predict(features)[0] # Hektograms per Hectare
                    
#                     # hg -> tons: 1 ton = 10,000 hg
#                     yield_tons_per_ha = pred_hg_ha / 10000.0
#                     predicted_yield_tons = yield_tons_per_ha * area_hectares
#                 else:
#                     # Mapping mismatch – fall back to heuristic
#                     print("Yield ML mapping mismatch for crop:", dataset_name)
#                     predicted_yield_tons = 2.0 * area_hectares # Default 2 tons/ha
#             except Exception as e:
#                 # Catch sklearn compatibility issues (e.g. monotonic_cst errors)
#                 print("Yield ML model error:", repr(e))
#                 # Fallback to heuristic average if available, else generic default
#                 avg_yield_ha = crop_info.get('avg_yield', 2.0)
#                 predicted_yield_tons = avg_yield_ha * area_hectares
#         else:
#             # Pure heuristic calculation
#             avg_yield_ha = crop_info['avg_yield']
#             predicted_yield_tons = avg_yield_ha * area_hectares

#         return {
#             "crop": crop_id,
#             "area": area_acres,
#             "predicted_yield": round(predicted_yield_tons, 2),
#             "unit": "tons",
#             "method": crop_info['source']
#         }

#     except Exception as e:
#         print(f"Yield Prediction Error: {e}")
#         raise HTTPException(status_code=500, detail=str(e))
#     except HTTPException as he:
#         raise he
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# def preprocess_image(image_bytes):
#     transform = transforms.Compose([
#         transforms.Resize((224, 224)),
#         transforms.ToTensor(),
#         transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
#     ])
#     image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
#     return transform(image).unsqueeze(0)

# @app.post("/predict_disease")
# async def predict_disease(file: UploadFile = File(...)):
#     if 'cnn' not in models_loaded and 'yolo' not in models_loaded:
#         raise HTTPException(status_code=503, detail="Disease models not loaded")
    
#     try:
#         image_bytes = await file.read()
#         results = {}
        
#         # CNN Prediction
#         if 'cnn' in models_loaded:
#             try:
#                 tensor = preprocess_image(image_bytes)
#                 with torch.no_grad():
#                     outputs = models_loaded['cnn'](tensor)
#                     probs = torch.nn.functional.softmax(outputs[0], dim=0)
#                     conf, pred_idx = torch.max(probs, 0)
                    
#                     class_name = models_loaded['cnn_classes'][pred_idx.item()]
#                     results['cnn'] = {
#                         "disease": class_name,
#                         "confidence": float(conf)
#                     }
                    
#                     # Logic to determine cure (mocked mapping for now or extract from name)
#                     # Merge structured info into the result
#                     info = get_cure_recommendation(class_name)
#                     results.update(info)
                    
#             except Exception as e:
#                 print(f"CNN Error: {e}")
        
#         return results

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# def get_cure_recommendation(disease_name):
#     # Comprehensive structured mapping for PlantVillage classes
#     # Returns { 'prevention': '...', 'cure': '...', 'fertilizer': '...' }
    
#     # Default fallback
#     default_info = {
#         "prevention": "Ensure proper crop rotation and clean field sanitation.",
#         "cure": "Consult a local agronomist for specific chemical controls.",
#         "fertilizer": "Maintain balanced NPK levels."
#     }

#     cure_map = {
#         # --- Rice ---
#         "Rice Blast": {
#             "prevention": "Avoid excessive nitrogen application. Maintain proper water level.",
#             "cure": "Apply Tricyclazole or Isoprothiolane immediately upon spotting lesions.",
#             "fertilizer": "Use Silicon-based fertilizers to strengthen leaves."
#         },
#         "Becterial Blight in Rice": {
#             "prevention": "Use resistant varieties. Avoid flooding fields.",
#             "cure": "Spray Copper Oxychloride + Streptocycline.",
#             "fertilizer": "Avoid top-dressing Nitrogen during outbreaks."
#         },
#         "Brownspot": {
#             "prevention": "Use certified disease-free seeds. Treat seeds with fungicides.",
#             "cure": "Spray Mancozeb or Propiconazole.",
#             "fertilizer": "Correct soil nutrient deficiencies (Potassium/Manganese)."
#         },
#         "Tungro": {
#             "prevention": "Control green leafhoppers which spread the virus.",
#             "cure": "No direct cure. Remove infected plants. Apply insecticides for vectors.",
#             "fertilizer": "Balanced NPK."
#         },
#         "Leaf smut": {
#             "prevention": "Use clean seeds. Hot water treatment of seeds.",
#             "cure": "Spray Copper fungicides.",
#             "fertilizer": "Balanced nutrition."
#         },

#         # --- Wheat ---
#         "Healthy Wheat": {
#             "prevention": "Good crop rotation.", 
#             "cure": "None.", 
#             "fertilizer": "Standard NPK recommended."
#         },
#         "Wheat Brown leaf Rust": {
#             "prevention": "Plant resistant varieties.",
#             "cure": "Fungicides: Propiconazole or Tebuconazole.",
#             "fertilizer": "Ensure adequate Potassium."
#         },
#         "Wheat___Yellow_Rust": {
#             "prevention": "Grow resistant varieties.",
#             "cure": "Spray Propiconazole or Triadimefon.",
#             "fertilizer": "Balanced fertilization."
#         },
#         "Wheat black rust": {
#             "prevention": "Eradicate alternate host (Barberry).",
#             "cure": "Apply fungicides like Mancozeb or Zineb.",
#             "fertilizer": "Avoid late nitrogen application."
#         },
#         "Wheat powdery mildew": {
#             "prevention": "Avoid dense planting.",
#             "cure": "Sulfur-based fungicides or Triadimefon.",
#             "fertilizer": "Avoid excess Nitrogen."
#         },
#         "Flag Smut": {
#             "prevention": "Seed treatment with Carboxin.",
#             "cure": "Remove infected plants.",
#             "fertilizer": "General recommendation."
#         },
#         "Wheat leaf blight": {
#             "prevention": "Use clean seeds.",
#             "cure": "Fungicide sprays (Mancozeb).",
#             "fertilizer": "Balanced NPK."
#         },
        

#         # --- Maize ---
#         "Healthy Maize": {
#              "prevention": "Maintain field hygiene.",
#              "cure": "None.",
#              "fertilizer": "Standard Maize mix."
#         },
#         "Common_Rust": {
#              "prevention": "Use resistant hybrids.",
#              "cure": "Fungicides: Azoxystrobin or Mancozeb if severe.",
#              "fertilizer": "Balanced NPK."
#         },
#         "Gray_Leaf_Spot": {
#              "prevention": "Crop rotation and tillage to bury residue.",
#              "cure": "Fungicides: Pyraclostrobin.",
#              "fertilizer": "Ensure adequate Potassium."
#         },
#         "maize fall armyworm": {
#             "prevention": "Deep ploughing before sowing. Intercropping.",
#             "cure": "Chemicals: Spinetoram or Emamectin benzoate.",
#             "fertilizer": "Split Nitrogen application."
#         },
#         "maize stem borer": {
#             "prevention": "Remove dead hearts. Light traps.",
#             "cure": "Apply Carbofuran granules in whorls.",
#             "fertilizer": "Balanced nutrition."
#         },
        
#         # --- Cotton ---
#         "Healthy cotton": {
#             "prevention": "Regular monitoring.",
#             "cure": "None.",
#             "fertilizer": "Recommended cotton NPK."
#         },
#         "Asian/American Bollworm on Cotton": { # Matching variations
#             "prevention": "Pheromone traps to monitor moths.",
#             "cure": "Insecticides: Indoxacarb, Spinosad.",
#             "fertilizer": "Avoid excessive Nitrogen."
#         },
#         "American Bollworm on Cotton": {
#             "prevention": "Pheromone traps. Border detergent spray.",
#             "cure": "Sprays: Indoxacarb or Spinosad.",
#             "fertilizer": "Balanced Nitrogen."
#         },
#         "Anthracnose on Cotton": {
#              "prevention": "Seed treatment.",
#              "cure": "Spray Copper Oxychloride.",
#              "fertilizer": "Potash application."
#         },
#         "bacterial_blight in Cotton": {
#             "prevention": "Use acid-delinted seeds.",
#             "cure": "Streptocycline + Copper Oxychloride spray.",
#             "fertilizer": "Balanced nutrition."
#         },
#         "Cotton Aphid": {
#             "prevention": "Yellow sticky traps.",
#             "cure": "Neem oil or Imidacloprid.",
#             "fertilizer": "Avoid lush growth from excess N."
#         },
#         "cotton mealy bug": {
#             "prevention": "Remove weeds (alternate hosts).",
#             "cure": "Spray Profenofos.",
#             "fertilizer": "Regular."
#         },
#         "cotton whitefly": {
#             "prevention": "Yellow sticky traps.",
#             "cure": "Spray Diafenthiuron or Neem oil.",
#             "fertilizer": "Avoid excess N."
#         },
#         "pink bollworm in cotton": {
#             "prevention": "Install Pheromone traps.",
#             "cure": "Insecticides: Profenofos or Cypermethrin.",
#             "fertilizer": "Balanced."
#         },
#         "Leaf Curl": {
#              "prevention": "Control Whitefly vector.",
#              "cure": "Remove infected plants.",
#              "fertilizer": "Balanced."
#         },
#         "Wilt": {
#              "prevention": "Use resistant varieties.",
#              "cure": "Drench soil with Carbendazim.",
#              "fertilizer": "Avoid waterlogging."
#         },

#         # --- Sugarcane ---
#         "Sugarcane Healthy": {
#             "prevention": "Maintain hygiene.",
#             "cure": "None.",
#             "fertilizer": "Standard."
#         },
#         "RedRot sugarcane": {
#             "prevention": "Use disease-free setts. Crop rotation.",
#             "cure": "No chemical cure. Remove infected clumps.",
#             "fertilizer": "Avoid excess N, apply K."
#         },
#         "RedRust sugarcane": {
#             "prevention": "Good drainage.",
#             "cure": "Spray Mancozeb.",
#             "fertilizer": "Balanced."
#         },
#         "Yellow Rust Sugarcane": {
#             "prevention": "Resistant varieties.",
#             "cure": "Spray Propiconazole.",
#             "fertilizer": "Balanced."
#         },
#         "Mosaic sugarcane": {
#             "prevention": "Use healthy setts. Control aphids.",
#             "cure": "Remove infected plants.",
#             "fertilizer": "Balanced."
#         }
#     }
    
#     # Try exact match first
#     if disease_name in cure_map:
#         return cure_map[disease_name]
        
#     return default_info

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8001)
















# import os
# import io
# import torch
# import torch.nn as nn
# from torchvision import transforms, models
# from ultralytics import YOLO
# from fastapi import FastAPI, File, UploadFile, HTTPException, Body
# from fastapi.middleware.cors import CORSMiddleware
# from PIL import Image
# import numpy as np
# import joblib

# app = FastAPI(title="Smart Crop Advisory ML Service")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# models_loaded = {}
# MODELS_DIR = 'models'


# # =============================
# # LOAD MODELS
# # =============================
# def load_models():
#     print("Loading models...")

#     try:
#         models_loaded['crop_rec'] = joblib.load(
#             os.path.join(MODELS_DIR, 'crop_recommendation_model.pkl')
#         )
#         print("Crop Recommendation model loaded.")
#     except Exception as e:
#         print(f"Error loading Crop Rec model: {e}")

#     try:
#         models_loaded['yield_model'] = joblib.load(
#             os.path.join(MODELS_DIR, 'yield_model.pkl')
#         )
#         models_loaded['yield_le'] = joblib.load(
#             os.path.join(MODELS_DIR, 'yield_label_encoder.pkl')
#         )
#         print("Yield Prediction model loaded.")
#     except Exception as e:
#         print(f"Error loading Yield model: {e}")

#     try:
#         yolo_path = os.path.join(MODELS_DIR, 'yolov11_inspired_detector.pt')
#         if os.path.exists(yolo_path):
#             models_loaded['yolo'] = YOLO(yolo_path)
#             models_loaded['yolo_classes'] = models_loaded['yolo'].names
#             print("YOLO model loaded.")
#     except Exception as e:
#         print(f"Error loading YOLO model: {e}")

#     try:
#         cnn_path = os.path.join(MODELS_DIR, 'cnn_resnet18_final.pth')
#         if os.path.exists(cnn_path):
#             checkpoint = torch.load(cnn_path, map_location='cpu')
#             cnn_model = models.resnet18(weights=None)
#             num_features = cnn_model.fc.in_features

#             class_names = checkpoint.get('class_names', [])
#             cnn_model.fc = nn.Sequential(
#                 nn.Linear(num_features, 512),
#                 nn.ReLU(),
#                 nn.Dropout(0.3),
#                 nn.Linear(512, len(class_names))
#             )

#             cnn_model.load_state_dict(checkpoint.get('model_state_dict', {}))
#             cnn_model.eval()

#             models_loaded['cnn'] = cnn_model
#             models_loaded['cnn_classes'] = class_names
#             print("CNN model loaded.")
#     except Exception as e:
#         print(f"Error loading CNN model: {e}")


# @app.on_event("startup")
# async def startup_event():
#     load_models()


# @app.get("/health")
# def health():
#     return {"status": "running", "models": list(models_loaded.keys())}


# # =============================
# # CROP RECOMMENDATION (TOP 3 + CONFIDENCE)
# # =============================
# @app.post("/recommend_crop")
# async def recommend_crop(data: dict = Body(...)):
#     if 'crop_rec' not in models_loaded:
#         raise HTTPException(status_code=503, detail="Model not loaded")

#     try:
#         model = models_loaded['crop_rec']

#         features = np.array([[
#             float(data.get('N')),
#             float(data.get('P')),
#             float(data.get('K')),
#             float(data.get('temperature')),
#             float(data.get('humidity')),
#             float(data.get('ph')),
#             float(data.get('rainfall'))
#         ]])

#         probabilities = model.predict_proba(features)[0]
#         classes = model.classes_

#         top3_indices = np.argsort(probabilities)[-3:][::-1]

#         top3 = []
#         for idx in top3_indices:
#             top3.append({
#                 "crop": classes[idx],
#                 "confidence": round(float(probabilities[idx] * 100), 2)
#             })

#         return {
#             "top_3_recommendations": top3
#         }

#     except Exception as e:
#         print("Crop Recommendation Error:", e)
#         raise HTTPException(status_code=500, detail=str(e))


# # =============================
# # YIELD PREDICTION (UNCHANGED)
# # =============================
# @app.post("/predict_yield")
# async def predict_yield(data: dict = Body(...)):
#     try:
#         crop_id = data.get('crop').lower()
#         area_acres = float(data.get('area'))

#         model = models_loaded.get('yield_model')
#         le = models_loaded.get('yield_le')

#         if model is None or le is None:
#             raise HTTPException(status_code=503, detail="Yield model not loaded")

#         classes = le.classes_
#         if crop_id.capitalize() not in classes:
#             return {
#                 "crop": crop_id,
#                 "predicted_yield": 2.0 * area_acres,
#                 "unit": "tons",
#                 "method": "fallback"
#             }

#         crop_encoded = le.transform([crop_id.capitalize()])
#         features = [[crop_encoded[0]]]
#         pred_hg_ha = model.predict(features)[0]

#         yield_tons_per_ha = pred_hg_ha / 10000.0
#         predicted_yield_tons = yield_tons_per_ha * (area_acres * 0.404686)

#         return {
#             "crop": crop_id,
#             "area": area_acres,
#             "predicted_yield": round(predicted_yield_tons, 2),
#             "unit": "tons",
#             "method": "ml"
#         }

#     except Exception as e:
#         print("Yield Prediction Error:", e)
#         raise HTTPException(status_code=500, detail=str(e))


# # =============================
# # DISEASE PREDICTION (UNCHANGED)
# # =============================
# def preprocess_image(image_bytes):
#     transform = transforms.Compose([
#         transforms.Resize((224, 224)),
#         transforms.ToTensor(),
#         transforms.Normalize([0.485, 0.456, 0.406],
#                              [0.229, 0.224, 0.225])
#     ])
#     image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
#     return transform(image).unsqueeze(0)


# @app.post("/predict_disease")
# async def predict_disease(file: UploadFile = File(...)):
#     if 'cnn' not in models_loaded:
#         raise HTTPException(status_code=503, detail="Disease model not loaded")

#     try:
#         image_bytes = await file.read()
#         tensor = preprocess_image(image_bytes)

#         with torch.no_grad():
#             outputs = models_loaded['cnn'](tensor)
#             probs = torch.nn.functional.softmax(outputs[0], dim=0)
#             conf, pred_idx = torch.max(probs, 0)

#         class_name = models_loaded['cnn_classes'][pred_idx.item()]

#         return {
#             "disease": class_name,
#             "confidence": float(conf)
#         }

#     except Exception as e:
#         print("Disease Prediction Error:", e)
#         raise HTTPException(status_code=500, detail=str(e))


# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8001)



































# import os
# import io
# import torch
# import torch.nn as nn
# from torchvision import transforms, models
# from ultralytics import YOLO
# from fastapi import FastAPI, File, UploadFile, HTTPException, Body
# from fastapi.middleware.cors import CORSMiddleware
# from PIL import Image
# import numpy as np
# import joblib

# app = FastAPI(title="Smart Crop Advisory ML Service")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# models_loaded = {}
# MODELS_DIR = 'models'


# # =============================
# # LOAD MODELS
# # =============================
# def load_models():
#     print("Loading models...")

#     # Crop Recommendation
#     try:
#         models_loaded['crop_rec'] = joblib.load(
#             os.path.join(MODELS_DIR, 'crop_recommendation_model.pkl')
#         )
#         print("Crop Recommendation model loaded.")
#     except Exception as e:
#         print(f"Error loading Crop Rec model: {e}")

#     # Yield Model
#     try:
#         models_loaded['yield_model'] = joblib.load(
#             os.path.join(MODELS_DIR, 'yield_model.pkl')
#         )
#         models_loaded['yield_le'] = joblib.load(
#             os.path.join(MODELS_DIR, 'yield_label_encoder.pkl')
#         )
#         print("Yield Prediction model loaded.")
#     except Exception as e:
#         print(f"Error loading Yield model: {e}")

#     # YOLO Model
#     try:
#         yolo_path = os.path.join(MODELS_DIR, 'yolov11_inspired_detector.pt')
#         if os.path.exists(yolo_path):
#             models_loaded['yolo'] = YOLO(yolo_path)
#             models_loaded['yolo_classes'] = models_loaded['yolo'].names
#             print("YOLO model loaded.")
#     except Exception as e:
#         print(f"Error loading YOLO model: {e}")

#     # CNN Disease Model
#     try:
#         cnn_path = os.path.join(MODELS_DIR, 'cnn_resnet18_final.pth')
#         if os.path.exists(cnn_path):
#             checkpoint = torch.load(cnn_path, map_location='cpu')

#             cnn_model = models.resnet18(weights=None)
#             num_features = cnn_model.fc.in_features

#             class_names = checkpoint.get('class_names', [])

#             cnn_model.fc = nn.Sequential(
#                 nn.Linear(num_features, 512),
#                 nn.ReLU(),
#                 nn.Dropout(0.3),
#                 nn.Linear(512, len(class_names))
#             )

#             cnn_model.load_state_dict(checkpoint.get('model_state_dict', {}))
#             cnn_model.eval()

#             models_loaded['cnn'] = cnn_model
#             models_loaded['cnn_classes'] = class_names

#             print("CNN model loaded.")
#             print("Classes:", class_names)

#     except Exception as e:
#         print(f"Error loading CNN model: {e}")


# @app.on_event("startup")
# async def startup_event():
#     load_models()


# @app.get("/health")
# def health():
#     return {"status": "running", "models": list(models_loaded.keys())}


# # =============================
# # CROP RECOMMENDATION (TOP 3)
# # =============================
# @app.post("/recommend_crop")
# async def recommend_crop(data: dict = Body(...)):
#     if 'crop_rec' not in models_loaded:
#         raise HTTPException(status_code=503, detail="Model not loaded")

#     try:
#         model = models_loaded['crop_rec']

#         features = np.array([[ 
#             float(data.get('N')),
#             float(data.get('P')),
#             float(data.get('K')),
#             float(data.get('temperature')),
#             float(data.get('humidity')),
#             float(data.get('ph')),
#             float(data.get('rainfall'))
#         ]])

#         probabilities = model.predict_proba(features)[0]
#         classes = model.classes_

#         top3_indices = np.argsort(probabilities)[-3:][::-1]

#         top3 = []
#         for idx in top3_indices:
#             top3.append({
#                 "crop": classes[idx],
#                 "confidence": round(float(probabilities[idx] * 100), 2)
#             })

#         return {
#             "top_3_recommendations": top3
#         }

#     except Exception as e:
#         print("Crop Recommendation Error:", e)
#         raise HTTPException(status_code=500, detail=str(e))


# # =============================
# # YIELD PREDICTION
# # =============================
# @app.post("/predict_yield")
# async def predict_yield(data: dict = Body(...)):
#     try:
#         crop_id = data.get('crop').lower()
#         area_acres = float(data.get('area'))

#         model = models_loaded.get('yield_model')
#         le = models_loaded.get('yield_le')

#         if model is None or le is None:
#             raise HTTPException(status_code=503, detail="Yield model not loaded")

#         classes = le.classes_
#         if crop_id.capitalize() not in classes:
#             return {
#                 "crop": crop_id,
#                 "predicted_yield": 2.0 * area_acres,
#                 "unit": "tons",
#                 "method": "fallback"
#             }

#         crop_encoded = le.transform([crop_id.capitalize()])
#         features = [[crop_encoded[0]]]
#         pred_hg_ha = model.predict(features)[0]

#         yield_tons_per_ha = pred_hg_ha / 10000.0
#         predicted_yield_tons = yield_tons_per_ha * (area_acres * 0.404686)

#         return {
#             "crop": crop_id,
#             "area": area_acres,
#             "predicted_yield": round(predicted_yield_tons, 2),
#             "unit": "tons",
#             "method": "ml"
#         }

#     except Exception as e:
#         print("Yield Prediction Error:", e)
#         raise HTTPException(status_code=500, detail=str(e))


# # =============================
# # DISEASE PREDICTION (FIXED)
# # =============================
# def preprocess_image(image_bytes):
#     transform = transforms.Compose([
#         transforms.Resize((224, 224)),
#         transforms.ToTensor(),
#         transforms.Normalize([0.485, 0.456, 0.406],
#                              [0.229, 0.224, 0.225])
#     ])
#     image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
#     return transform(image).unsqueeze(0)


# @app.post("/predict_disease")
# async def predict_disease(file: UploadFile = File(...)):
#     if 'cnn' not in models_loaded:
#         raise HTTPException(status_code=503, detail="Disease model not loaded")

#     try:
#         image_bytes = await file.read()
#         tensor = preprocess_image(image_bytes)

#         with torch.no_grad():
#             outputs = models_loaded['cnn'](tensor)
#             probs = torch.nn.functional.softmax(outputs[0], dim=0)

#             conf, pred_idx = torch.max(probs, 0)

#         confidence_percent = round(float(conf) * 100, 2)
#         class_name = models_loaded['cnn_classes'][pred_idx.item()]

#         # DEBUG PRINTS
#         print("All probabilities:", probs)
#         print("Predicted class:", class_name)
#         print("Confidence %:", confidence_percent)

#         # Safety fallback if model unsure
#         if confidence_percent < 50:
#             return {
#                 "disease": "Uncertain - Please consult expert",
#                 "confidence": confidence_percent
#             }

#         return {
#             "disease": class_name,
#             "confidence": confidence_percent
#         }

#     except Exception as e:
#         print("Disease Prediction Error:", e)
#         raise HTTPException(status_code=500, detail=str(e))


# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8001)













import os
import io

import torch
import torch.nn as nn
from torchvision import transforms, models

from fastapi import FastAPI, File, UploadFile, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware

from PIL import Image
import numpy as np
import joblib


app = FastAPI(title="Smart Crop Advisory ML Service")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


models_loaded = {}

MODELS_DIR = "models"


# =============================
# LOAD MODELS
# =============================
def load_models():
    print("Loading lightweight models...")

    # =============================
    # CROP RECOMMENDATION
    # =============================
    try:
        models_loaded["crop_rec"] = joblib.load(
            os.path.join(
                MODELS_DIR,
                "crop_recommendation_model.pkl"
            )
        )

        print("Crop Recommendation model loaded.")

    except Exception as e:
        print(f"Error loading Crop Rec model: {e}")


    # =============================
    # YIELD MODEL
    # =============================
    try:
        models_loaded["yield_model"] = joblib.load(
            os.path.join(
                MODELS_DIR,
                "yield_model.pkl"
            )
        )

        models_loaded["yield_le"] = joblib.load(
            os.path.join(
                MODELS_DIR,
                "yield_label_encoder.pkl"
            )
        )

        print("Yield Prediction model loaded.")

    except Exception as e:
        print(f"Error loading Yield model: {e}")


# =============================
# STARTUP
# =============================
@app.on_event("startup")
async def startup_event():

    load_models()

    print("ML service started successfully.")

    print(
        "Loaded models:",
        list(models_loaded.keys())
    )


# =============================
# HEALTH
# =============================
@app.get("/health")
def health():

    return {
        "status": "running",
        "models": list(models_loaded.keys())
    }


# =============================
# CROP RECOMMENDATION
# =============================
@app.post("/recommend_crop")
async def recommend_crop(data: dict = Body(...)):

    if "crop_rec" not in models_loaded:

        raise HTTPException(
            status_code=503,
            detail="Crop recommendation model not loaded"
        )

    try:

        model = models_loaded["crop_rec"]

        features = np.array([[
            float(data.get("N")),
            float(data.get("P")),
            float(data.get("K")),
            float(data.get("temperature")),
            float(data.get("humidity")),
            float(data.get("ph")),
            float(data.get("rainfall"))
        ]])

        probabilities = model.predict_proba(features)[0]

        classes = model.classes_

        top3_indices = np.argsort(
            probabilities
        )[-3:][::-1]

        top3 = []

        for idx in top3_indices:

            top3.append({
                "crop": classes[idx],
                "confidence": round(
                    float(probabilities[idx] * 100),
                    2
                )
            })

        return {
            "top_3_recommendations": top3
        }

    except Exception as e:

        print(
            "Crop Recommendation Error:",
            e
        )

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# =============================
# YIELD PREDICTION
# =============================
@app.post("/predict_yield")
async def predict_yield(data: dict = Body(...)):

    try:

        crop_id = data.get("crop").lower()

        area_acres = float(
            data.get("area")
        )

        model = models_loaded.get(
            "yield_model"
        )

        le = models_loaded.get(
            "yield_le"
        )

        if model is None or le is None:

            raise HTTPException(
                status_code=503,
                detail="Yield model not loaded"
            )

        classes = le.classes_

        if crop_id.capitalize() not in classes:

            return {
                "crop": crop_id,
                "predicted_yield": 2.0 * area_acres,
                "unit": "tons",
                "method": "fallback"
            }

        crop_encoded = le.transform([
            crop_id.capitalize()
        ])

        features = [
            [crop_encoded[0]]
        ]

        pred_hg_ha = model.predict(
            features
        )[0]

        yield_tons_per_ha = (
            pred_hg_ha / 10000.0
        )

        predicted_yield_tons = (
            yield_tons_per_ha
            * (area_acres * 0.404686)
        )

        return {
            "crop": crop_id,
            "area": area_acres,
            "predicted_yield": round(
                predicted_yield_tons,
                2
            ),
            "unit": "tons",
            "method": "ml"
        }

    except Exception as e:

        print(
            "Yield Prediction Error:",
            e
        )

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# =============================
# DISEASE IMAGE PREPROCESSING
# =============================
def preprocess_image(image_bytes):

    transform = transforms.Compose([

        transforms.Resize(
            (224, 224)
        ),

        transforms.ToTensor(),

        transforms.Normalize(
            [0.485, 0.456, 0.406],
            [0.229, 0.224, 0.225]
        )
    ])

    image = Image.open(
        io.BytesIO(image_bytes)
    ).convert("RGB")

    return transform(image).unsqueeze(0)


# =============================
# LOAD CNN ONLY WHEN NEEDED
# =============================
def load_cnn_model():

    if "cnn" in models_loaded:

        return (
            models_loaded["cnn"],
            models_loaded["cnn_classes"]
        )

    cnn_path = os.path.join(
        MODELS_DIR,
        "cnn_resnet18_final.pth"
    )

    if not os.path.exists(cnn_path):

        raise HTTPException(
            status_code=503,
            detail="Disease model file not found"
        )

    try:

        print(
            "Loading CNN disease model..."
        )

        checkpoint = torch.load(
            cnn_path,
            map_location="cpu"
        )

        cnn_model = models.resnet18(
            weights=None
        )

        num_features = (
            cnn_model.fc.in_features
        )

        class_names = checkpoint.get(
            "class_names",
            []
        )

        if not class_names:

            raise Exception(
                "CNN class names not found"
            )

        cnn_model.fc = nn.Sequential(

            nn.Linear(
                num_features,
                512
            ),

            nn.ReLU(),

            nn.Dropout(
                0.3
            ),

            nn.Linear(
                512,
                len(class_names)
            )
        )

        cnn_model.load_state_dict(
            checkpoint[
                "model_state_dict"
            ]
        )

        cnn_model.eval()

        models_loaded["cnn"] = cnn_model

        models_loaded[
            "cnn_classes"
        ] = class_names

        print(
            "CNN disease model loaded."
        )

        print(
            "Classes:",
            class_names
        )

        return (
            cnn_model,
            class_names
        )

    except Exception as e:

        print(
            "CNN Loading Error:",
            e
        )

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# =============================
# DISEASE PREDICTION
# =============================
@app.post("/predict_disease")
async def predict_disease(
    file: UploadFile = File(...)
):

    try:

        # Load CNN only when
        # disease prediction is requested

        cnn_model, class_names = (
            load_cnn_model()
        )

        image_bytes = await file.read()

        tensor = preprocess_image(
            image_bytes
        )

        with torch.no_grad():

            outputs = cnn_model(
                tensor
            )

            probs = torch.nn.functional.softmax(
                outputs[0],
                dim=0
            )

            conf, pred_idx = torch.max(
                probs,
                0
            )

        confidence_percent = round(
            float(conf) * 100,
            2
        )

        class_name = class_names[
            pred_idx.item()
        ]

        print(
            "Predicted class:",
            class_name
        )

        print(
            "Confidence:",
            confidence_percent
        )

        if confidence_percent < 50:

            return {
                "disease":
                    "Uncertain - Please consult expert",

                "confidence":
                    confidence_percent
            }

        return {
            "disease":
                class_name,

            "confidence":
                confidence_percent
        }

    except HTTPException:

        raise

    except Exception as e:

        print(
            "Disease Prediction Error:",
            e
        )

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# =============================
# RUN SERVER
# =============================
if __name__ == "__main__":

    import uvicorn

    port = int(
        os.environ.get(
            "PORT",
            8001
        )
    )

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port
    )