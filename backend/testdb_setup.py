import sqlite3

# Connect to the database
conn = sqlite3.connect("./backend/wordWeave.db")
cursor = conn.cursor()

# Create connections table
cursor.execute(
    """
CREATE TABLE IF NOT EXISTS connections (
    id INTEGER PRIMARY KEY,
    connection TEXT NOT NULL,
    word1 TEXT NOT NULL,
    word2 TEXT NOT NULL,
    word3 TEXT NOT NULL,
    word4 TEXT NOT NULL
)
"""
)

# Insert sample data
cursor.execute(
    """
INSERT INTO connections (connection, word1, word2, word3, word4) 
VALUES (?, ?, ?, ?, ?)
""",
    ("Connection1", "Word1", "Word2", "Word3", "Word4"),
)

cursor.execute(
    """
INSERT INTO connections (connection, word1, word2, word3, word4) 
VALUES (?, ?, ?, ?, ?)
""",
    ("Connection2", "Word5", "Word6", "Word7", "Word8"),
)

cursor.execute(
    """
INSERT INTO connections (connection, word1, word2, word3, word4) 
VALUES (?, ?, ?, ?, ?)
""",
    ("Connection3", "Word9", "Word10", "Word11", "Word12"),
)

cursor.execute(
    """
INSERT INTO connections (connection, word1, word2, word3, word4) 
VALUES (?, ?, ?, ?, ?)
""",
    ("Connection4", "Word13", "Word14", "Word15", "Word16"),
)

# Commit the changes
conn.commit()

# Query connections with their words
cursor.execute(
    """
SELECT connection, word1, word2, word3, word4
FROM connections
"""
)

rows = cursor.fetchall()

for row in rows:
    print(row)

# Close the connection
conn.close()
