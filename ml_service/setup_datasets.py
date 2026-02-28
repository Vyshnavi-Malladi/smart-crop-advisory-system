import os
import sys
from kaggle.api.kaggle_api_extended import KaggleApi

# Ensure credentials are picked up from ~/.kaggle/kaggle.json
# or set them here if file read fails (fallback)
os.environ['KAGGLE_USERNAME'] = "raashishaggarwal"
os.environ['KAGGLE_KEY'] = "c169facb209a72ae1c75299d61ccf575"

def download_datasets():
    api = KaggleApi()
    api.authenticate()

    # 1. Crop Recommendation (We know this works)
    print("Checking Crop Recommendation Dataset...")
    if not os.path.exists('ml_service/datasets/Crop_recommendation.csv'):
        print("Downloading Crop Recommendation Dataset...")
        api.dataset_download_files('atharvaingle/crop-recommendation-dataset', path='ml_service/datasets', unzip=True)
    else:
        print("Crop Recommendation Dataset already exists.")

    # 2. Yield Prediction (Try multiple sources)
    candidates = [
        'thefc17/crop-yield-prediction-dataset',
        'patelris/crop-yield-prediction-dataset',
        'manasgarg/crop-yield-prediction-in-india',
        'sudalairajkumar/crop-production-in-india' # Ensure this is last if it fails
    ]
    
    success = False
    for dataset in candidates:
        try:
            print(f"Attempting to download {dataset}...")
            api.dataset_download_files(dataset, path='ml_service/datasets', unzip=True)
            print(f"Successfully downloaded {dataset}")
            success = True
            break
        except Exception as e:
            print(f"Failed to download {dataset}: {e}")
    
    if not success:
        print("All yield dataset candidates failed.")
        sys.exit(1)

if __name__ == "__main__":
    download_datasets()
