import requests
import json

letter = "a"
url = "https://api.spoonacular.com/food/ingredients/autocomplete"
query={"apiKey":"f68592685bdb4ac9a6cd7649b01e329b",
    "query":letter,
       "number":1,
       "metaInformation":True
}
response = requests.request("GET", url,params=query )
data =response.json()

for i in range(0, 10):
    data_set = {"product_name": "", "product_aisle": "", "product_url_to_image":"","product_id":""}
    data_dumps= json.dumps(data_set)
    productModel= json.loads(data_dumps)
    productModel["product_name"] = data[i]["name"]
    productModel["product_aisle"] = data[i]["aisle"]
    imageLink = "https://spoonacular.com/cdn/ingredients_100x100/" + data[i]["image"]
    productModel["product_url_to_image"] = imageLink
    productModel["product_id"] = data[i]["id"]

    url = "http://localhost:8080/products/add"

    x = requests.post(url, json=productModel)
    print(x.text)

#Image link: https://spoonacular.com/cdn/ingredients_100x100/{}



