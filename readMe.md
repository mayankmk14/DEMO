## Nodejs Demo

This is a Demo backend NodeJs app to demonstrate working of JWT with CRUD operations on MongoDB. It includes basics blocks of NodeJs (callbacks, promises & Async-await) and basic routing architecture.

#### NOTE : THIS IS NOT PRODUCTION GRADE WORK

#### Prerequisite

* Node.js  v8.9.0 

* MongoDB v4.2.0

* Create a `users` collection with following data to proceed: 

    `{ "name": "ADMIN",
    "userId": "ADMIN",
    "email": "admin@admin.com",
    "type": "ADMIN" }`

* LOGIN - to get ADMIN's JWT token with payload :

    `{ "userId": "ADMIN",
    "email": "admin@admin.com"}`

* Add Mentors - /admin/add - pass ADMIN token as `x-access-token` with payload :

    `{ "name":"MAYANK",
	"userId":"mk@13",
	"email":"naruto@naruto.com",
	"task":["AI","ML"],
	"type":"MENTOR" }`

* GET all Mentors - /admin/list - pass ADMIN token as `x-access-token`

* Update TASK for existing Mentors - /admin/list - pass ADMIN token as `x-access-token` :

    `{ "userId":"mk@13",
	"task":["BLOCKCAIN"] }`

* Delete a Mentors - /admin/deleteUser - pass ADMIN token as `x-access-token`

    `{ "userId":"mk@13" }`

#### API's - for ADMIN

* http://localhost:9000/login ----- to get JWT token for ADMIN

* http://localhost:9000/admin/add ----- to add Mentor to Collection

* http://localhost:9000/admin/list ----- to read all the Mentors

* http://localhost:9000/admin/update ----- to update Mentors Task list

* http://localhost:9000/admin/deleteUser ----- to Delete a Mentor
