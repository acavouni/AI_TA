

Currently implementing the backend using flask and python because it is lightweight and very easy to start a server

currently using an in memory login/authenticate system until we get bigger and want to move to something like firebase or postgresql

below is an easy way to start/test on your own

This is a Python Flask backend application for an AI tutor project.

### Setup Instructions:
1. Import Flask in `app.py`. (obviously)
2. Create/activate virtual environment (not necessary but definitely helpfuil when dealing with ollama packages eventually)
   - `python3 -m venv venv`
   - `source venv/bin/activate` (Mac/Linux) or `venv\Scripts\activate` (Windows)
3. Install dependencies: (made a txt file with all dependencies i have installed so far)
   - `pip install -r requirements.txt`
4. Run the Flask app:
   - `python app.py`

### Endpoints so far:
- **POST /login** - Authenticates users, returns a simple token.
- **POST /query** - Accepts a user question and returns a placeholder response.
- **POST /logout** - Logs out a user by invalidating the session.

### Next Steps:
- Move from simple token authentication to something more secure
- Integrate a document retriever to provide real AI-generated responses.
- Store user and document data in a database (firebase, postgresql)

### Testing:
- I have used curl commands so far to test, and everything works (because its very simple)
- Ensure the server is running before making requests.
- Check responses to verify authentication and query handling.


