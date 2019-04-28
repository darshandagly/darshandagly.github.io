import json
import time
from collections import defaultdict
import re


def repl_func(m):
    """process regular expression match groups for word upper-casing problem"""
    return m.group(1) + m.group(2).upper()


start_time = time.time()

dropdown_list = []

with open('data/full_data.json') as json_file:
    json_data = json.load(json_file)

    for locality_data in json_data:
        locality = locality_data['locality']
        locality_dict = defaultdict()

        locality_dict["_id"] = locality
        locality_dict["hotel"] = []

        hotel_data = locality_data['hotels']
        print(locality)
        hotel_list = []
        for hotel in hotel_data:
            hotel_name = hotel['name']
            hotel_id = hotel['id']

            hotel_list.append([hotel_id, hotel_name])

        hotel_list.sort(key=lambda x: x[1])

        for item in hotel_list:
            s = re.sub("(^|\s)(\S)", repl_func, item[1])
            locality_dict["hotel"].append({"key": item[0], "name": s})

        dropdown_list.append(locality_dict)

        with open('output/drop_down_data.json', 'w') as outfile:
            json.dump(dropdown_list, outfile)

        end_time = time.time()

print("Total Time = ", end_time - start_time)
