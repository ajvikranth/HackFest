from dotenv import load_dotenv
import os
import joblib
from together import Together
from sklearn.preprocessing import StandardScaler
import time

def redistribute_classification(df_km):
    scaler = StandardScaler()
    X_train = scaler.fit_transform(df_km)
    knn = joblib.load("./model/knn.pkl")
    return knn.predict(X_train)

def find_the_product_recommendation(product_name: str = '', product_quantity: str = ''):
    """
    """
    load_dotenv("../.envfile")
    time.sleep(1)
    TOGETHER_API = os.getenv('TOGETHER_API')
    client = Together(api_key=TOGETHER_API)

    response = client.chat.completions.create(
        model="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
        messages=[
            {
                    "role": "user",
                    "content": f"Assume you are a Chief.You have {product_quantity} of {product_name}. I want a list of all Repurpose Prepared Foods items that could be made with these products as main ingredient and some other ingredients"
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
