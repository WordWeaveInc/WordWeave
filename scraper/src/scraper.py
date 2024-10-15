import requests
from src.config import BASE_URL, HEADERS, TIMEOUT
from src.parser import parse_page

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.config import BASE_URL, HEADERS, TIMEOUT

def fetch_page(url):
    try:
        response = requests.get(url, headers=HEADERS, timeout=TIMEOUT)
        response.raise_for_status()  # Raise HTTPError for bad responses
        return response.text
    except requests.exceptions.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return None

def scrape():
    html_content = fetch_page(BASE_URL)
    if html_content:
        parse_page(html_content)

if __name__ == "__main__":
    scrape()
