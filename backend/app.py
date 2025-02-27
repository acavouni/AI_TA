from flask import Flask, request, jsonify

app = Flask(__name__)

#some test database below (we will later move to postgresql or firebase)
users = {
    "testuser":"password123",
    "admin":"securepass"}
active_sessions = {}


#list of endpoints

#login - fetching users data/password combo / authenticate to the database
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username, password = data.get("username"), data.get("password")
    #authenticate
    if users.get(username) == password:

        token = f"token_{username}"
        active_sessions[username] = token

        return jsonify({"message": "Login successful", "token": token}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

#/query

@app.route("/query", methods=["POST"])
def query():
    data = request.json
    user_token = data.get("token")
    
    if user_token not in active_sessions.values():
        return jsonify({"error": "Unauthorized"}), 403

    user_query = data.get("question")
    if not user_query:
        return jsonify({"error": "No query provided"}), 400

    response = f"Question Received! '{user_query}', will later respond with RAG system."
    return jsonify({"response": response})


@app.route("/logout", methods=["POST"])
def logout():
    #removes the current user session
    data = request.json
    user_token = data.get("token")

    for username, token in active_sessions.items():
        if token == user_token:
            del active_sessions[username]
            return jsonify({"message": "Logout successful"}), 200

    return jsonify({"error": "Invalid token"}), 403



#refresh screen
@app.route("/refresh", methods=["POST"])
def refresh():
    return jsonify({"message": "Documents refreshed"}), 200

#click butons and find documents
@app.route("/document/<doc_id>", methods=["GET"])
def fetch_document(doc_id):
    #should actually look up the database
    return jsonify({"document_id": doc_id, "content": "Document content goes here"})

if __name__ == "__main__":
    app.run(debug=True)

