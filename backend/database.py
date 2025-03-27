import uuid
from typing import Any
from tinydb import TinyDB, Query
from datetime import datetime, timedelta, UTC


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
		return True if doc_id else False


	def verify_user(self, username: str, password: str) -> bool:
		""" Verify the password for a user """
		user = self.users.get(Query().user_id == username)
		if not user: return False

		# check if the passwor match
		if user.get("password") == password: return True
		else: return False


	def delete_user(self, username: str):
		pass


	def create_session(self, username: str) -> str|None:
		""" Create an UUID-V4 token for the session """
		# verify whether the user exist before operation
		if not self.users.contains(Query().user_id == username): return None

		# token creation
		session_token = str(uuid.uuid4())

		# make the expire time 2 hours later after the token creation (UTC+0 Zone)
		expiration_time = datetime.now(UTC) + timedelta(hours=2)
		expire = expiration_time.timestamp()

		# insert the entry to the database
		doc_id = self.sessions.insert({"user_id": username, "token": session_token, "expires_at": expire})
		return session_token if doc_id else None


	def termiante_session(self, username: str, token: str) -> bool:
		""" Termiante an UUID-V4 session token of user """
		# check if the user & session exist in the database
		removed_doc_id = self.sessions.remove((Query().user_id == username) & (Query().token == token))
		return True if removed_doc_id else False


	def verify_session(self, username: str, token: str) -> bool:
		""" Verify a session token of the user """
		# check whether the session exist in the database
		session = self.sessions.get((Query().user_id == username) & (Query().token == token))
		if not session: return False

		# check if session expired
		current = datetime.now(UTC).timestamp()
		return current < session.get("expires_at", 0)


	def get_folders(self, username: str) -> dict[str, list[str]]|None:
		""" Return a list folders name and the chat_ids inside it """
		user_folders = self.chat_folders.get(Query().user_id == username)
		if not user_folders: return None
		folders = user_folders.get("folders", [])
		if not folders: return None
		
		# parse the folder and chat_ids
		result: dict[str, list[str]] = {}
		for folder in folders:
			label = folder.get("label")
			chat_ids = folder.get("chat_ids", [])
			if label: result[label] = chat_ids

		return result


	def organize_chat(self, username: str, chat_id: str, folder: str) -> bool:
		""" Organize a chat into a speicied folder under the username """
		pass


	def get_chat(self, chat_id: str) -> list[dict[str, Any]]:
		""" Return a list of dictionary for the specified chat log """
		pass


	def delete_chat(self, chat_id: str) -> bool:
		""" Delete a chat log based on the chat_id """
		pass



if __name__ == "__main__":
	agent = DatabaseAgent("database.json")
	folders = agent.get_folders("chou610")
	print(folders)
