import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import joblib
import os

MODELS_DIR = 'models'
DATA_DIR = 'datasets'
os.makedirs(MODELS_DIR, exist_ok=True)

def train_crop_recommendation():
    print("Training Crop Recommendation Model...")
    try:
        df = pd.read_csv(os.path.join(DATA_DIR, 'Crop_recommendation.csv'))
        
        # Features: N, P, K, temperature, humidity, ph, rainfall
        X = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
        y = df['label']
        
        # Train model
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X, y)
        
        # Save model
        joblib.dump(model, os.path.join(MODELS_DIR, 'crop_recommendation_model.pkl'))
        print("Crop Recommendation Model trained and saved.")
        
    except Exception as e:
        print(f"Error training crop recommendation model: {e}")

def train_yield_prediction():
    print("Training Yield Prediction Model using Real Data (Global)...")
    try:
        # Load Real Dataset
        # Using yield_df.csv which has 'Item', 'hg/ha_yield'
        df = pd.read_csv(os.path.join(DATA_DIR, 'yield_df.csv'))
        
        # Features and Target
        # We only use 'Item' (Crop) to predict Yield/Ha because we don't have weather inputs from user
        # and we want a global average/trend for that crop.
        # Ideally we would use more features, but for this level of user input (Crop + Area), 
        # crop is the main determinant we can use.
        
        # Clean data
        df = df[['Item', 'hg/ha_yield']].dropna()
        
        # Remove outliers for better generalization (optional but good)
        df = df[df['hg/ha_yield'] < df['hg/ha_yield'].quantile(0.99)]

        le = LabelEncoder()
        df['Crop_Encoded'] = le.fit_transform(df['Item'])
        
        X = df[['Crop_Encoded']]
        y = df['hg/ha_yield'] # Target: Yield per Hectare (hg/ha)
        
        # Train Model
        model = RandomForestRegressor(n_estimators=100, random_state=42)
        model.fit(X, y)
        
        # Save Model and Encoder
        joblib.dump(model, os.path.join(MODELS_DIR, 'yield_model.pkl'))
        joblib.dump(le, os.path.join(MODELS_DIR, 'yield_label_encoder.pkl'))
        
        print(f"Real Yield Prediction Model trained on {len(df)} records.")
        print("Supported Crops:", le.classes_)
        
    except Exception as e:
        print(f"Error training yield prediction model: {e}")

if __name__ == "__main__":
    train_crop_recommendation()
    train_yield_prediction()
