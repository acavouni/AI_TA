import os
import uuid
from flask import Flask
from tinydb import TinyDB, Query


class DatabaseAgent:
	def __init__(self, database):
		self.db = TinyDB(database)

	def register_user(self, username: str, email: str, password: str) -> bool:
		pass

	def verify_user(self, username: str, password: str) -> bool:
		pass

	def remove_token(self, username: str, token: str) -> bool:
		pass

	def create_token(self, username: str) -> str:
		pass


class BackendServer:
	def __init__(self):
		pass




if __name__ == "__main__":
	agent = DatabaseAgent("database.json")
