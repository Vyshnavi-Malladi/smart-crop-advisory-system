
import pandas as pd

try:
    df = pd.read_csv('datasets/yield_df.csv')
    india_df = df[df['Area'] == 'India']
    if india_df.empty:
        print("No data for India found!")
    else:
        print("Unique Crops in India:")
        print(india_df['Item'].unique())
except Exception as e:
    print(f"Error: {e}")
