
import pandas as pd

try:
    df = pd.read_csv('datasets/yield.csv')
    print("Raw Yield CSV Unique Crops:")
    print(df['Item'].unique())
except Exception as e:
    print(f"Error: {e}")
