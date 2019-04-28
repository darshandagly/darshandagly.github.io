from textblob import TextBlob
import json
import time

start_time = time.time()
bar_chart_data = []

with open('data/latest_full_data.json') as json_file:
    json_data = json.load(json_file)

    for locality_data in json_data:
        print(locality_data['locality'])
        hotel_data = locality_data['hotels']
        for hotel in hotel_data:
            hotel_reviews = hotel['review']

            positive_count = 0
            negative_count = 0

            average_rating = {}
            bar_chart_object = {}

            for review in hotel_reviews:
                polarity = TextBlob(review['text']).sentiment[0]
                if polarity > 0.1:
                    label = "Positive"
                    positive_count += 1
                else:
                    label = "Negative"
                    negative_count += 1

                ratings = review['ratings']
                for k, v in ratings.items():
                    if k in average_rating:
                        average_rating[k] = (average_rating[k][0] + v, average_rating[k][1] + 1)
                    else:
                        average_rating[k] = (v, 1)

            total_count = max(1, positive_count + negative_count)

            bar_chart_object["locality"] = locality_data['locality']
            bar_chart_object["name"] = hotel['name']
            bar_chart_object["class"] = hotel['class']
            bar_chart_object['link'] = hotel['url']
            bar_chart_object["positive"] = round(positive_count / total_count, 2) * 100
            bar_chart_object["negative"] = round(negative_count / total_count, 2) * 100

            for k, v in average_rating.items():
                bar_chart_object[k] = v[0] / v[1]

            bar_chart_data.append(bar_chart_object)

with open('output/bar_chart_with_url.json', 'w') as outfile:
    json.dump(bar_chart_data, outfile)
end_time = time.time()

print("Total Time = ", end_time - start_time)
