import pickle
import pandas as pd
import sys

try:
    with open('models/yield_label_encoder.pkl', 'rb') as f:
        le = pickle.load(f)
        print("Classes found in model:", le.classes_)
except Exception as e:
    print(f"Error inspecting model: {e}")
