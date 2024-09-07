import requests
import json

# Define the endpoint URL
url = 'http://127.0.0.1:5000/get_data'

# Define the parameters
params = {
    'expires_at': '2024-10-15',  # Example date
    'store_id': 2    # Example store ID
}

headers = {
    'Content-Type': 'application/json'
}


# Send the GET request to the endpoint
response = requests.post(url, json=params, headers=headers)

# Print the status code and response data
print(f'Status Code: {response.status_code}')
try:
    print(f'Response Data: {response.json()}')
except:
    print(response.text)