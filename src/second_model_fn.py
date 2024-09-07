import pandas as pd
import math

a1  = 49.4873357297657, 8.466263441912194
a2 = 49.46714125585514, 8.481209709068896
a3 = 49.546064226685544, 8.441416765251992
a4  = 49.51673542357937, 8.353278664116408
a5 = 49.45735006577803, 8.422489683636131

base_df = pd.read_csv("updated.csv", index_col=False)
# input_df = base_df[base_df['store_id'] == store_id]

def handle_get_kilometer_from_gps(lat1, lon1, lat2, lon2):
    R = 6371.0
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)
    dlat = lat2_rad - lat1_rad
    dlon = lon2_rad - lon1_rad
    a = math.sin(dlat / 2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = R * c
    return distance
    
def redistributed_products(data, base_data, store_id):
    results = []
    # Iterate over unique product IDs in the data DataFrame
    for name in data['name'].values:
        required_demand, required_availability = data[(data['store_id'] == store_id) & (data['name'] == name)][['demand', 'available']].values[0].tolist()
        required_quantity = required_demand - required_availability
        base_df = base_data[base_data['store_id'] != store_id]
        remaining_stores = base_df['store_id'].unique()
        output = []

        for remaining_store in remaining_stores:
            if remaining_store == 1:
                gps = a1
            elif remaining_store == 2: 
                gps = a2
            elif remaining_store == 3: 
                gps = a3
            elif remaining_store == 4: 
                gps = a4
            elif remaining_store == 5: 
                gps = a5

            if store_id == 1:
                main_gps = a1
            elif store_id == 2: 
                main_gps = a2
            elif store_id == 3: 
                main_gps = a3
            elif store_id == 4: 
                main_gps = a4
            elif store_id == 5: 
                main_gps = a5    
            
            demand_in_store, available_in_store = base_df[(base_df['store_id'] == remaining_store) & (base_df['name'] == name)][['demand', 'available']].values[0].tolist()
            output.append([demand_in_store - available_in_store, handle_get_kilometer_from_gps(main_gps[0], main_gps[1], gps[0], gps[1]), int(remaining_store)])

        output = sorted(output, key=lambda x: x[1])
        for i in range(len(output)):
            if output[i][0] >= 0 or required_quantity < 0:
                output[i] = [0, output[i][2]]
            else:
                if required_quantity < abs(output[i][0]):
                    output[i] = [required_quantity, output[i][2]]
                    required_quantity = 0
                else:
                    required_quantity += output[i][0]
                    output[i] = [abs(output[i][0]), output[i][2]]
        output = sorted(output, key=lambda x: x[1])
        output_values = [{f"Store {i[1]}" : i[0] for i in output}]
        if required_quantity < 0:
            required_quantity = 0
        output_values.append(required_quantity)
        # Append results with name
        results.append({'name': name, 'output': output_values, "expires_in" : data[(data['store_id'] == store_id) & (data['name'] == name)]['expire_in'].values[0].tolist(), "demand" : required_demand, "availablity" : required_availability})

    # Create a DataFrame from the results
    result_df = pd.DataFrame(results)
    return result_df

if __name__ == "__main__":
    print(redistributed_products(data=base_df[base_df['store_id'] == 1], base_data=base_df, store_id=1))