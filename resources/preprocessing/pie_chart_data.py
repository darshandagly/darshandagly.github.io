import json
import time
import math

start_time = time.time()
output_json = []

with open('data/data.json') as json_file:
    json_data = json.load(json_file)
    for locality_data in json_data:
        locality = locality_data['locality']
        hotel_data = locality_data['hotels']
        star_data = [0, 0, 0, 0, 0]
        for hotel in hotel_data:
            hotel_class = math.ceil(hotel['class'])
            star_data[hotel_class-1] += 1
        count_array = [{'rating': "1 star", 'value': star_data[0]}
            , {'rating': "2 star", 'value': star_data[1]}
            , {'rating': "3 star", 'value': star_data[2]}
            , {'rating': "4 star", 'value': star_data[3]}
            , {'rating': "5 star", 'value': star_data[4]}]

        output_json.append({'locality': locality, 'count': count_array})

with open('output/pie_chart_data.json', 'w') as outfile:
    json.dump(output_json, outfile)
