import sqlite3
con = sqlite3.connect("app/carbon_calc.db")
cur = con.cursor()

# SQL_CREATE_TABLE = '''CREATE TABLE IF NOT EXISTS post(post_id INTEGER PRIMARY KEY,  user_id INTEGER, post_title TEXT,  post_date DATE, post_text TEXT)'''
# cur.execute(SQL_CREATE_TABLE)

# SQL_CREATE_TABLE = '''CREATE TABLE IF NOT EXISTS comment(comment_id INTEGER PRIMARY KEY, user_id INTEGER, post_id INTEGER, comment_text TEXT)'''
# cur.execute(SQL_CREATE_TABLE)

cur.execute("""ALTER TABLE comment ADD comment_date DATE""")

con.commit()

# cur.execute("""
#                 INSERT INTO user VALUES
#                 (1, "johndoe123", "asdf", 123.456),
#                 (2, "janedoe456", "wilgh", 727.2)""")
# con.commit()
# con.close()

# res = cur.execute("SELECT * FROM user")
# p = res.fetchall()
# print(p)

# cur.execute("""DROP TABLE user""")
# con.commit()
