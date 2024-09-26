FROM mongo:latest

COPY food_nutrition.json /food_nutrition.json
CMD mongoimport --host mongo --db usersdb --collection fooditems --drop --file /food_nutrition.json --jsonArray
