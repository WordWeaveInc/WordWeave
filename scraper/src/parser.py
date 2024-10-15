from bs4 import BeautifulSoup

def parse_page(html):
    soup = BeautifulSoup(html, 'html.parser')
    
    # Adjust this selector based on the website's HTML structure
    games = soup.find_all('div', class_='game')
    
    for game in games:
        # Example: Extract game date and name
        date = game.find('span', class_='date').text
        name = game.find('span', class_='name').text
        print(f"Game Date: {date}, Game Name: {name}")
    
    # You can return data or save it to a file at this point
