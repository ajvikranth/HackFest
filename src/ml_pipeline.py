import pandas
from data import data_processing
from predict import redistribute_classification, find_the_product_recommendation

def main(expiresAt, store_id):
    df = data_processing(expiresAt, store_id)
    if df.empty:
        print("heeeeeereeeee")
        return { "message": " No products in which are about to expire "}
    chosen_features = ["expire_in", "remaining_quantity", "price", "weight"]
    df_km = df[chosen_features]
    distribute = redistribute_classification(df_km)
    print(distribute)
    recycle = [not bool(x) for x in distribute]
    print(df[recycle][['name',"available"]])

    if df[recycle][['name',"available"]].empty:
        return { "message": " No products in which are about to expire "}
    recycle_input = df[recycle][['name',"available"]]
    return find_the_product_recommendation(recycle_input)

if __name__=="__main__":
    expiresAt, store_id = '2024-10-15' , 2
    main(expiresAt, store_id)