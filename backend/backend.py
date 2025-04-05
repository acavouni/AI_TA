import secrets
from typing import Any
from database import DatabaseAgent
from itsdangerous import URLSafeSerializer, BadSignature
from flask import Flask, request, make_response, jsonify, current_app

app = Flask(__name__)
app.config['SECRET_KEY'] = secrets.token_urlsafe(32)
agent = DatabaseAgent("database.json")


@app.route("/api/login", methods=['POST'])
def login():
	""" User Login Authentication """
	data = request.get_json(silent=True)
	if not data: return jsonify({"status": "Invalid Format, Expected JSON."}), 400

	# parse the request parameter
	username = data.get("user_id")
	password = data.get("password")

	# attempt to login with the database agent
	if not agent.verify_user(username, password):
		return jsonify({"status": "Invalid Login Credential."}), 401

	# verification passed, give out session key
	token, expire = agent.create_session(username)

	# set the CYK authentication token
	response = make_response({"status": "Login Success."}, 200)
	serializer = URLSafeSerializer(current_app.config['SECRET_KEY'])
	signed_token = serializer.dumps({
		"user_id": username,
		"token": token
	})

	# set the CYK authentication token to client's browser
	response.set_cookie(
		key = "cyk_token",
		value = signed_token,
		expires = expire,
		httponly = True,
		secure = True,
		samesite = "Strict"
	)
	return response


@app.route("/api/logout", methods=['POST'])
def logout():
	""" Logout the current user """
	try:
		# extract the authentication token
		cookie = request.cookies.get("cyk_token")
		serializer = URLSafeSerializer(current_app.config['SECRET_KEY'])
		token = serializer.loads(cookie)
		user_id = token.get("user_id")
		token = token.get("token")

		# logout user
		if agent.terminate_session(user_id, token):
			return jsonify({"status": "Logout Success."}), 200
		else:
			return jsonify({"status": "Logout Failed."}), 403

	except BadSignature:
		return jsonify({"status": "Tampered or Invalid Signature in Token."}), 401

	except Exception:
		return jsonify({"status": "Unexpected Error while Verifying Token."}), 400


@app.route("/api/register", methods=['POST'])
def register():
	""" Register a new user on site """
	ata = request.get_json(silent=True)
	if not data: return jsonify({"status": "Invalid Format, Expected JSON."}), 400

	# parse the request parameter
	email = data.get("email")
	username = data.get("user_id")
	password = data.get("password")

	# proceed on the user registration
	if agent.register_user():
		return jsonify({"status": "Register Success."}), 200
	else: 
		return jsonify({"status": "Register Failed."}), 409


@app.route("/api/folders", methods=['GET'])
def get_folders():
	""" Receive the user's chats and folders """
	try:
		# extract the authentication token
		cookie = request.cookies.get("cyk_token")
		serializer = URLSafeSerializer(current_app.config['SECRET_KEY'])
		token = serializer.loads(cookie)
		user_id = token.get("user_id")
		token = token.get("token")

		# verify whether the token is valid
		if not agent.verify_session(user_id, token):
			return jsonify({"status": "Invalid Access Token."}), 403

		# receive the user folder if token is valid
		folders = agent.get_folders(user_id)
		return jsonify(folders), 200

	except BadSignature:
		return jsonify({"status": "Tampered or Invalid Signature in Token."}), 401

	except Exception:
		return jsonify({"status": "Unexpected Error while Verifying Token."}), 400


@app.route("/api/chat", methods=['GET'])
def get_chat():
	pass


@app.route("/api/chat", methods=['POST'])
def log_chat():
	pass



if __name__ == "__main__":
	app.run(port=8888)
