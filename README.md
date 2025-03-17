# Installation and setup instructions

Before starting, ensure that you have the following software installed:
- [Node.js](https://nodejs.org/) (Recommended version: x.x.x)
- [Docker](https://www.docker.com/get-started) (for containerized deployment)
- [Git](https://git-scm.com/) (to clone the repository)

1. Clone the repository:
   ```bash
   git clone https://github.com/Kotravel095/task-management-api.git

2. cd task-management-api

3. npm install

4. create .env for example using config below
    ---------------------------------------------
    MONGO_URI=mongodb://localhost:27017
    MONGO_USER=Jeerawat
    MONGO_PASS=9f5de330042677f034f36a474bf1e3f1a2adbd0c
    MONGO_DBNAME=task_management_systam
    JWT_SECRET=104462eb8d06ad1585b59b8ef597483009ac662b
    ---------------------------------------------
    
5. for start => npm run start
App;ication running at => http://localhost:3000

# API Documentation
API Documenttation At => http://localhost:3000/api-docs

# Example Request/Response

1. Register
Request => 
curl --location 'http://localhost:3000/users/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test@gmail.com",
    "password": "P@ssw0rd",
    "name": "Test",
    "tel": "0999999999"
}'

Response => 
{
    "email": "test@gmail.com",
    "password": "$2b$10$4abvEY6LPB4FV28552YzUeSytpWZt0spAB3i.z7j0SqYOBILaZP.C",
    "name": "Test",
    "tel": "0999999999",
    "_id": "67d84154a1baae7d90870fcf",
    "__v": 0
}

2. Login
Request => 
curl --location 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test@gmail.com",
    "password": "P@ssw0rd"
}'

Response => 
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwic3ViIjoiNjdkODQxNTRhMWJhYWU3ZDkwODcwZmNmIiwiaWF0IjoxNzQyMjI1ODAzLCJleHAiOjE3NDIyMjk0MDN9.T4sqaZaS41w5BhJg1zRoM9HV3TmpSc20saLupcgpoNY"
}

3. Create Task
Request => 
curl --location 'http://localhost:3000/task' \
--header 'Authorization: Bearer [[YOUR_JWT_TOKEN]]' \
--header 'Content-Type: application/json' \
--data '{
    "title": "KOKO22",
    "description": "KOKO22",
    "status": "in-progress"
}'

Response => 
{
    "code": 200,
    "status": "success",
    "message": "insert successfully"
}

4. Get Task
Request =>
curl --location 'http://localhost:3000/task?page=1&limit=2' \
--header 'Authorization: Bearer [[YOUR_JWT_TOKEN]]'

Response => 
{
    "code": 200,
    "status": "success",
    "message": "success",
    "total": 17,
    "data": [
        {
            "_id": "67d83ec6368a22c9680096bf",
            "title": "Updated Title22",
            "description": "Updated description222",
            "status": "completed",
            "createdAt": "2025-03-17T15:24:54.074Z",
            "updatedAt": "2025-03-17T15:25:40.377Z",
            "__v": 0
        },
        {
            "_id": "67d83d88d0884a1c8ac5ed60",
            "title": "Test222",
            "description": "12321",
            "status": "in-progress",
            "createdAt": "2025-03-17T15:19:36.059Z",
            "updatedAt": "2025-03-17T15:19:36.059Z",
            "__v": 0
        }
    ]
}

5. Update task 
Request => 
curl --location --request PUT 'http://localhost:3000/task/67d83ec6368a22c9680096bf' \
--header 'Authorization: Bearer [[YOUR_JWT_TOKEN]]' \
--header 'Content-Type: application/json' \
--data '{
  "title": "Updated Title22",
  "description": "Updated description222",
  "status": "completed"
}'

Response => 
{
    "code": 200,
    "status": "success",
    "message": "update successfully"
}

6. Delete Task
Request => 
curl --location --request DELETE 'http://localhost:3000/task/67d83f0837136f1b5c83bb9d' \
--header 'Authorization: Bearer [[YOUR_JWT_TOKEN]]'

Response => 
{
    "code": 200,
    "status": "success",
    "message": "Task deleted successfully"
}

# Instructions for running Unit Tests

# Instructions for running the system in local development
1. npm install
2. npm run start:dev

# Instructions for running the system via Docker
1. Start Docker compose => docker-compose up -d
2. Down Docker compose => docker-compose down
