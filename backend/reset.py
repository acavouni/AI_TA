
from tinydb import TinyDB, Query


if __name__ == "__main__":
    # open the connection and truncate all entry in all tables
    db = TinyDB("database.json")
    for table in db.tables():
        db.table(table).truncate()
    

    # insert the dummy user entry in table `users`
    users_table = db.table("users")
    users_table.insert({"username": "chen5292", "email": "chen5292@purdue.edu", "password": "apple123"})
    users_table.insert({"username": "chou610", "email": "chou610@purdue.edu", "password": "banana666"})
    
    # dump the whole database
    print("[Table Dump]:\n{}\n".format(db.tables()))

    # dump all the entry in all tables
    for table in db.tables():
        print("[Table] {}:\n{}\n".format(table, db.table(table).all()))