import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
import time


url = "https://connectionsgame.org/?game=12-06-2023"
driver = webdriver.Firefox()
driver.get(url)
response = requests.get(url)
soup = BeautifulSoup(response.content, "html.parser")

for i in range(4):
    connection = False
    while connection == False:
        tiles = soup.find_all('div', class_='word')
        for i in range(16):
            