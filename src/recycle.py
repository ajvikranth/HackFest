
from dotenv import load_dotenv
import os
from together import Together

load_dotenv()





def find_the_product_recommendation(product_name: str = '', product_quantity: str = ''):
    """
    """
    TOGETHER_API = os.getenv('TOGETHER_API')


    client = Together(api_key=TOGETHER_API)

    response = client.chat.completions.create(
        model="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
        messages=[
            {
                    "role": "user",
                    "content": f"Assume you are a Chief. I have {product_quantity} of {product_name}. I want all the products that could be done"
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


# product_name = 'eggs'
# product_quantity = 10