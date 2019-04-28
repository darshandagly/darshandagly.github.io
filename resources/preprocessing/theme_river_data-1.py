from textblob import TextBlob
import json
import time
import os
import csv
from datetime import datetime
from collections import defaultdict


start_time = time.time()

with open('data/full_data.json') as json_file:
    json_data = json.load(json_file)

    for locality_data in json_data:
        locality = locality_data['locality']
        hotel_data = locality_data['hotels']
        print(locality)

        os.mkdir(os.getcwd() + '/output/theme_river_data/' + locality)

        for hotel in hotel_data:
            hotel_name = hotel['name']
            hotel_reviews = hotel['review']

            hotel_name = hotel_name.replace(" ", "_")
            hotel_name = hotel_name.replace("/", "-")

            positive_review_dict = defaultdict()
            negative_review_dict = defaultdict()

            output_csv = [['key', 'value', 'date']]

            for review in hotel_reviews:

                date_object = datetime.strptime(review['date'], '%B %d, %Y')
                converted_date = int(datetime.strftime(date_object, '%Y%m%d'))

                review_blob = TextBlob(review['text'])
                polarity = review_blob.sentiment[0]

                if polarity > 0.1:
                    label = "Positive"
                    positive_review_dict[converted_date] = positive_review_dict.get(converted_date, 0) + 1
                else:
                    label = "Negative"
                    negative_review_dict[converted_date] = negative_review_dict.get(converted_date, 0) + 1

            # date_list_sorted = sorted(set(date_list))
            # print(hotel_name, min_date, max_date)
            for date in range(min_date, max_date):
                try:
                    if date in positive_review_dict:
                        output_csv.append(['POS', positive_review_dict[date],
                                           datetime.strftime(datetime.strptime(str(date), '%Y%m%d'), '%m/%d/%y')])
                    else:
                        output_csv.append(['POS', 0,
                                           datetime.strftime(datetime.strptime(str(date), '%Y%m%d'), '%m/%d/%y')])
                except ValueError:
                    pass

            for date in range(min_date, max_date):
                try:
                    if date in negative_review_dict:
                        output_csv.append(['NEG', negative_review_dict[date],
                                           datetime.strftime(datetime.strptime(str(date), '%Y%m%d'), '%m/%d/%y')])
                    else:
                        output_csv.append(['NEG', 0,
                                           datetime.strftime(datetime.strptime(str(date), '%Y%m%d'), '%m/%d/%y')])
                except ValueError:
                    pass

            # for date in date_list_sorted:
            #     try:
            #         if date in positive_review_dict:
            #             output_csv.append(['POS', positive_review_dict[date],
            #                                datetime.strftime(datetime.strptime(date, '%y%m%d'), '%m/%d/%y')])
            #         else:
            #             output_csv.append(['POS', 0,
            #                                datetime.strftime(datetime.strptime(date, '%y%m%d'), '%m/%d/%y')])
            #     except ValueError:
            #         print(date, hotel_name)

            # for date in date_list_sorted:
            #     try:
            #         if date in negative_review_dict:
            #             output_csv.append(['NEG', negative_review_dict[date],
            #                                datetime.strftime(datetime.strptime(date, '%y%m%d'), '%m/%d/%y')])
            #         else:
            #             output_csv.append(['NEG', 0,
            #                                datetime.strftime(datetime.strptime(date, '%y%m%d'), '%m/%d/%y')])
            #     except ValueError:
            #         print(date, hotel_name)

            with open(os.getcwd() + '/output/theme_river_data/' + locality + '/' + hotel_name + '.csv',
                      'w') as csvFile:
                writer = csv.writer(csvFile)
                writer.writerows(output_csv)
            csvFile.close()

end_time = time.time()

print("Total Time = ", end_time - start_time)
