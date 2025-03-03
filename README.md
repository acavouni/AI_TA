# AI_TA
Codebase for our AI Teaching Assistant - VIP Team AI for Education

---
User Authentication
- POST /auth/login
    > Authenticate the user password with the hash stored in the database.
    >
    > If verification success, update user status in database table login, give out cookie as session ID.
- POST /auth/logout
    > Logout the current user, and update user status in database table login.
- POST /auth/passwdreset
    > Reset a specific user's password in email.
---
Document Management
- GET /documents/info
    > Fetch the metadata for the target document specified by hash value in request parameter ID
- POST /documents/upload
    > Upload an local file to the server, but how to store the file is TBD.
---
AI Model Processing
- GET /chat
    > Post an query to the AI model, the model output will be included in the content of the response.
- GET /chat/history
    > Retrieve the list of chat history. (Probably in XML or JSON)
- POST /chat/folders
    > Retrieve the list of chat folders. (Probably in XML or JSON)
- POST /chat/classify
    > Update the folder classification to a specific folder.
---
