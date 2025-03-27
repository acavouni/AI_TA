import uuid
from typing import Any
from tinydb import TinyDB, Query


class DatabaseAgent:
	def __init__(self, database):
		self.db = TinyDB(database)
		self.users = self.db.table("users")
		self.sessions = self.db.table("sessions")
		self.chat_folders = self.db.table("chat_folders")
		self.chat_logs = self.db.table("chat_logs")


	def register_user(self, username: str, email: str, password: str) -> bool:
		""" Create a new entry of user in the database """
		doc_id = self.user.insert({"user_id": username, "email": email, "password": password})
		if doc_id > 0: return True
		else: return False


	def verify_user(self, username: str, password: str) -> bool:
		""" Verify the password for a user """
		user = self.users.get(Query().user_id == username)
		if not user: return False

		# check if the passwor match
		if user.get("password") == password: return True
		else: return False


	def verify_session(self, username: str, token: str) -> bool:
		""" Verify a session token of the user """
		pass


	def termiante_session(self, username: str, token: str) -> bool:
		""" Termiante an UUID-V4 session token of user """
		pass


	def create_session(self, username: str) -> str:
		""" Create an UUID-V4 token for the session """
		pass


	def get_folders(self, username: str) -> dict[str, list[str]]:
		""" Return a list of UUID for the folders """
		pass


	def get_chat(self, username: str, chat_id: str) -> list[dict[str, Any]]:
		""" Return a list of dictionary for the specified chatlog """
		pass



if __name__ == "__main__":
	agent = DatabaseAgent("database.json")
	status = agent.verify_user("chen5292", "apple123")
	print(status)
