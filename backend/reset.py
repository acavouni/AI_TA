from tinydb import TinyDB, Query


if __name__ == "__main__":
    # open the connection and truncate all entry
    db = TinyDB("database.json")
    db.truncate()

    # insert the default dummy data
    db.insert({"username": "chen5292", "email": "chen5292@purdue.edu", "password": "apple123"})
    db.insert({"username": "chou610", "email": "chou610@purdue.edu", "password": "banana666"})
    print(db.all())