import pandas as pd
from utils import handle_get_kilometer_from_gps

main_gps  = 49.4873357297657, 8.466263441912194
a2 = 49.46714125585514, 8.481209709068896
a3 = 49.546064226685544, 8.441416765251992
a4  = 49.51673542357937, 8.353278664116408
a5 = 49.45735006577803, 8.422489683636131

base_df = pd.read_csv("updated.csv", index_col=False)
input_df = base_df[base_df['store_id'] == store_id]

def get_balance(data, base_data, product_id, store_id):
    required_demand, required_availability = data[(data['store_id'] == store_id) & (data['id'] == product_id)][['demand', 'available']].values[0].tolist()
    required_quantity = required_demand - required_availability
    base_df = base_data[base_data['store_id'] != store_id]
    remaining_stores = base_df['store_id'].unique()
    output = []
    for remaining_store in remaining_stores[remaining_stores != store_id]:
        if remaining_store == 2: gps = a2
        elif remaining_store == 3: gps = a3
        elif remaining_store == 4: gps = a4
        elif remaining_store == 5: gps = a5
        demand_in_store, available_in_store  = base_df[(base_df['store_id'] == remaining_store) & (base_df['id'] == product_id)][['demand', 'available']].values[0].tolist()
        output.append([demand_in_store - available_in_store, handle_get_kilometer_from_gps(main_gps[0], main_gps[1],gps[0], gps[1]), int(remaining_store)])
    
    output = sorted(output, key=lambda x: x[1])
    
    for i in range(len(output)):
        if output[i][0] >= 0:
            output[i] = [0, output[i][2]]
        else:
            if required_quantity < -(required_quantity[i][0]):
                output[i] = [required_quantity, output[i][2]]
                required_quantity = 0
            else:
                output[i] = [output[i][0], output[i][2]]
                required_quantity -= output[i][0]
    output = sorted(output, key=lambda x : x[1])
    output = [i[0] for i in output]
    output.append(required_quantity)
    return output
    
    
get_balance(data=base_df[base_df['store_id'] == 1], base_data=base_df, product_id=8376291, store_id=1)