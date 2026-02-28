
import pandas as pd

try:
    df = pd.read_csv('datasets/yield_df.csv')
    print("Global Unique Crops:")
    print(df['Item'].unique())
except Exception as e:
    print(f"Error: {e}")
