from typing import Any
from database import DatabaseAgent
from flask import Flask, request, make_response, jsonify, render_template_string

app = Flask(__name__)


@app.route("/api/login", methods=['POST'])
def login():
	data = request.get_json(silent=True)
	if not data: return jsonify({'status': 'Invalid Format, expected JSON.'}), 400

	# parse the request parameter
	username = data.get("username")
	password = data.get("password")

	# template
	html_template = """
	<html>
		<head><title>Debug Login Info</title></head>
		<body>
			<h1>Login Debug</h1>
			<p><strong>Username:</strong> {{ username }}</p>
			<p><strong>Password:</strong> {{ password }}</p>
		</body>
	</html>
    """
	return render_template_string(html_template, username=username, password=password)


def get_folder():
	pass


if __name__ == "__main__":
	app.run(port=8888)
