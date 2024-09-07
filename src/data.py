import requests
import random
import pandas as pd
from datetime import datetime



def get_data():
    url = "https://hackathon-products-api.apps.01.cf.eu01.stackit.cloud/api/articles"
    response = requests.get(url, timeout=50)
    data = response.json()
    return data

def handle_threshold_for_expiry(date):
    if date < 20:
        return 'c1'
    if  20 < date < 100:
        return 'c2'

    if  100 < date < 150:
        return 'c3'
    
    if 150 < date < 225:
        return 'c4'
    return 'c5'

def api_data_preprocessing(expire):

    df = pd.DataFrame(get_data())
    df['expiresAt'] = pd.to_datetime(df['expiresAt'])
    df['manufacture_date'] = pd.Timestamp.now()
    df['date_diff'] = df['expiresAt'] - df['manufacture_date']
    df['expire_in'] = df['date_diff'].dt.days

    df['demand'] = df['available'].apply(lambda x:   int(x *  random.uniform(0.8, 1.2))  )
    df['store_id'] =  1

    df['demand'] = df['available'].apply(lambda x:   int(x *  random.uniform(0.8, 1.2))  )
    df['store_id'] =  1

    # Initialize a list to store all new records
    all_new_data = []

    # Loop over the store IDs
    for store in [2, 3, 4, 5]:
        # Loop over each unique 'id'
        for each in df['id'].unique():
            # Select the record where 'id' matches
            record_value = df[df['id'] == each].copy() 
            
            random_available = random.uniform(0, 1.3)
            random_demand = random.uniform(0.8, 1.2)
            new_available = int(record_value['available'].values[0] * random_available)  
            demand = int(record_value['available'].values[0] * random_demand)  
            
            # Update 'available' and 'store_id' values
            record_value['available'] = new_available
            record_value['store_id'] = store
            record_value['demand']  = demand
            
            # Append the modified record to the list
            all_new_data.append(record_value)

    # Concatenate all new records into a single DataFrame
    new_df = pd.concat(all_new_data, ignore_index=True)

    # Optionally, combine the original df with the new_df
    final_df = pd.concat([df, new_df], ignore_index=True)

    # print(final_df)

    # final_df.to_csv('updated.csv',index=False)

    return final_df[final_df['expiresAt'] == expire]

def scale(x):
    if "kg" in x:
        return float(x[:-2])*1000
    if "g" in x:
        return float(x[:-1])
    if "ml" in x:
        return float(x[:-2])
    if "l" in x or "L" in x:
        return float(x[:-1])*1000
    return float(x)

def data_processing(expiry):
    df = api_data_preprocessing(expiry)
    df['remaining_quantity'] = df['demand'] - df['available']
    df['weight'] = df['weight'].apply(scale)
    chosen_features = ["expire_in", "remaining_quantity", "price", "weight"]
    df_km = df[chosen_features]
    return df_km

if __name__ == "__main__":
    date_str = '2024-09-23'
    date_object = datetime.strptime(date_str, '%Y-%m-%d')
    print(type(date_object))
    print(date_object)
    print(data_processing(date_object))  # printed in default format