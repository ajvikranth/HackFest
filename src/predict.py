from dotenv import load_dotenv
import os
import joblib
from together import Together
from sklearn.preprocessing import StandardScaler
import time

def redistribute_classification(df_km):
    scaler = joblib.load('./model/scaler.pkl') 
    print(df_km, 'df_km')
    X_train = scaler.transform(df_km)
    knn = joblib.load("./model/knn.pkl")
    return knn.predict(X_train)

def find_the_product_recommendation(product_name: str = '', product_quantity: str = ''):
    """
    """
    load_dotenv("../.envfile")
    TOGETHER_API = os.getenv('TOGETHER_API')
    client = Together(api_key=TOGETHER_API)

    response = client.chat.completions.create(
        model="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
        messages=[
            {
                    "role": "user",
                    "content": f"Assume you are a Chef.You have the following products and quantites available {product_quantity} of {product_name}. I want a list of all Repurpose Prepared Foods items that could be made with these products as main ingredient and some other ingredients. Don't include a preamble"
            },
    ],
        max_tokens=6342,
        temperature=0.7,
        top_p=0.7,
        top_k=50,
        repetition_penalty=1,
        stop=["<|eot_id|>","<|eom_id|>"],
        stream=True
    )
    all_text = str().join([chunk.choices[0].text for chunk in response])
    return all_text

def find_the_bundle_recommendation(product_name: str = '', product_quantity: str = ''):
    """
    """
    load_dotenv("../.envfile")
    TOGETHER_API = os.getenv('TOGETHER_API')
    client = Together(api_key=TOGETHER_API)

    response = client.chat.completions.create(
        model="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
        messages=[
            {
                    "role": "user",
                    "content": f"You are a culinary assistant.You have {product_quantity} of {product_name}. You are assigned a task of creating food making kits with these products and their quantities. Generate a set of 3-5 best bundles (food maker kits) that can be created from these ingredients. Each bundle should contain 3-5 items that would work well together to make a meal or dish. For each bundle, provide a name for the bundle, list out the specific ingredients included, provide a short description of what type of meal or dish the bundle is intended for. Don't include a preamble"
            },
    ],
        max_tokens=6342,
        temperature=0.7,
        top_p=0.7,
        top_k=50,
        repetition_penalty=1,
        stop=["<|eot_id|>","<|eom_id|>"],
        stream=True
    )
    all_text = str().join([chunk.choices[0].text for chunk in response])
    return all_text
