import pickle
import numpy as np

try:
    with open('models/yield_label_encoder.pkl', 'rb') as f:
        data = pickle.load(f)
        print("Type:", type(data))
        print("Data:", data)
except Exception as e:
    print(f"Error inspecting model: {e}")
