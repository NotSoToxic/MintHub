import requests

# Define the API endpoint and parameters
api_endpoint = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
api_params = {
    "start": "1",
    "limit": "20",
    "convert": "INR"
}

# Define the criteria and weights
criteria_weights = {
    "Market Capitalization": 0.3,
    "Trading Volume": 0.2,
    "Price Performance": 0.9,
}

# Define a function to calculate the score for a cryptocurrency
def calculate_score(crypto):
    scores = crypto["scores"]
    total_score = sum([scores[i] * criteria_weights[criteria] for i, criteria in enumerate(criteria_weights)])
    return total_score
# Make the API request and retrieve the data
headers = {
    "Accepts": "application/json",
    "X-CMC_PRO_API_KEY": "e599d2e9-8e45-4157-83ef-94452325fd8c"
}
response = requests.get(api_endpoint, params=api_params, headers=headers)
data = response.json()

# Extract the relevant data for each cryptocurrency
cryptocurrencies = {}
for i, crypto_data in enumerate(data["data"]):
    crypto_name = crypto_data["name"]
    market_cap1 = crypto_data["quote"]["INR"]["market_cap"]
    volume1 = crypto_data["quote"]["INR"]["volume_24h"]
    market_cap = market_cap1/volume1
    volume = volume1/market_cap1
    price_change_pct = crypto_data["quote"]["INR"]["percent_change_24h"]
    scores = [market_cap, volume, price_change_pct]
    print(scores)
    cryptocurrencies[crypto_name] = {"scores": scores}

# Calculate the score for each cryptocurrency
for crypto_name, crypto_data in cryptocurrencies.items():
    score = calculate_score(crypto_data)
    print(f"{crypto_name}: {score}")