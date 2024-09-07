import pandas
from data import data_processing
from predict import redistribute_classification, find_the_product_recommendation

def main():
    expiry = '2024-09-23'
    df = data_processing(expiry)
    chosen_features = ["expire_in", "remaining_quantity", "price", "weight"]
    df_km = df[chosen_features]
    distribute = redistribute_classification(df_km)
    recycle = [not bool(x) for x in distribute]
    print(df[recycle][['name',"available"]])
    recycle_input = df[recycle][['name',"available"]]
    print(find_the_product_recommendation(recycle_input))

if __name__=="__main__":
    main()