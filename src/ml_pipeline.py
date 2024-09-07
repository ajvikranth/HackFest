import pandas as pd
import json
from data import data_processing
from predict import redistribute_classification, find_the_product_recommendation
from second_model_fn import redistributed_products, base_df

def main(expiresAt, store_id):
    df = data_processing(expiresAt, store_id)
    if df.empty:
        print("heeeeeereeeee")
        return { "message": ""}
    chosen_features = ["expire_in", "remaining_quantity", "price", "weight"]
    df_km = df[chosen_features]
    distribute = redistribute_classification(df_km)
    recycle = [not bool(x) for x in distribute]
    redistribute = [bool(x) for x in distribute]
    print(recycle)
    print(redistribute)
    output_json = {
    "message": "success",
    "current_store": store_id,
    "is_llm": False,
    "llm": "",
    "is_store": False,
    "store": {},
    "product_names":[],
    "expires_in": [],
    "response":[],
    "demand": [],
    "availability": []
  }

    if sum(recycle) > 0:
        output_json['is_llm'] = True
    if not df[redistribute][['name',"available"]].empty:
        output_df = redistributed_products(data=df[redistribute], base_data=base_df, store_id=store_id)
        print(output_df)
        redist_llm = {'name' : [], 'available' : []}
        for output in output_df.values:
            if sum(list(output[1][0].values())) > 1:
                output_json['is_store'] = True
                for key, value in output[1][0].items():
                    if key in output_json['store']:
                        output_json['store'][key] += value
                    else:
                        output_json['store'][key] = value  
                output_json['response'].append(1)
            else:
                output_json['response'].append(0)

            output_json['product_names'].append(output[0])
            output_json['expires_in'].append(output[2])
            
            output_json['demand'].append(output[3])
            output_json['availability'].append(output[4])
            if output[1][1] > 0:
                if not output_json['is_llm']:
                    output_json['is_llm'] = True
                redist_llm['name'].append(output[0])
                redist_llm['available'].append(output[1][1])
    else:
        output_json['is_store'] = False

    redist_llm_df = pd.DataFrame(redist_llm)
    print("LLM df", redist_llm_df)
    if redist_llm_df.empty:
        recycle_input = df[recycle][['name',"available"]]
    else:
        recycle_input = pd.concat([df[recycle][['name',"available"]], redist_llm_df])
    print(recycle_input)
    if output_json['is_llm']:
        output_json['llm'] = find_the_product_recommendation(recycle_input)
    
    return json.dumps(output_json)

if __name__=="__main__":
    expiresAt, store_id = '2024-10-15' , 2
    main(expiresAt, store_id)