# Node-Assessment with vue Project

# Vue Setup
yarn install
yarn serve


# Node Setup
npm install
npm run start 

# Requirement
Please read the following instructions carefully and follow sequentially.
1. You need to checkout these repositories on to your local system
API
https://gitlab.com/byteridge/interviews/simple-login-api-node-
mongo
2. Repositories will need to be run together for you to demo your task
3. Following is the existing behavior of this code
•
User can login and logout as a normal user.
4. Following are set of tasks you need to complete to be successful in this round
TASK . In the API
1. Change the login API to also record the login/logout of a user
with the timestamp and the client IP
2. Implement a new API (GET /audit) that will retrieve all
login/logout of users with the timestamp and the client IP
3. If a user is not having the AUDITOR role the /audit API
should return an HTTP 401 response (You need to add a role in the
given schema for user)
(Note: Please test if the Api created by you are working in postman before submitting
the code)
Once you have completed the tasks commit your code (UI and API) to two separate
repositories on GitHub/Gitlab/Bitbucket or your private bitbucket repo or Zip the source
code folders and share in email.