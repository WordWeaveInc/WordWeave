import csv

def save_to_csv(data, filename="output.csv"):
    with open(filename, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['Game Date', 'Game Name'])  # Column headers
        for row in data:
            writer.writerow(row)