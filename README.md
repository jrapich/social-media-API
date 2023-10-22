
# social-media-api
<img src='./lib/license.svg'>   <img src='./lib/express-4.18.2.svg'> <img src='./lib/mongoose-7.6.3.svg'> <img src='./lib/dayJS-1.11.10.svg'> <img src='./lib/dotenv-16.3.1.svg'>

## Description
this project is a backend example social-media API that stores and interacts with data stored in MongoDB.  It uses ExpressJS and mongoose to acheive this, providing a user with a RESTful CRUD API to manage users, thoughts/posts, and their reactions.

## Installation
To install this API, first clone the repository, and install dependencies with 

`npm install`       

You will also need MongoDB installed as well, with the location to access it configured in

`/config/connection`      

Once configured and dependencies installed, start the API server with  

`node server.js` or `npm start`      

## Usage
There are many routes to access this API, all of which fall under /api.  You can test this in the browser or with Insomnia by sending a get request to localhost:3001/api/users/all to show all users  stored in the db.    

Here is a list of all routes reachable with this API:     

GET `/api/users/all` for all users    

GET `/api/users/id` replace 'id' with a user's db _id to view a specific user.      

POST `/api/users/create` to add a user to db     

PUT `/api/users/update/id` to update a user by db _id      

DELETE `/api/users/delete/id` to delete a user by _id. will also delete all thoughts by the user       

POST `/api/users/userID/friends/friendID` add a friendID to a user userID's friend list     

DELETE `/api/users/userID/friends/friendID` same as above, but to delete a friend

GET `/api/thoughts/all` to view all thoughts and their reactions in db

GET `/api/thoughts/id` to view a specific thought by its _id stored in db

POST `/api/thoughts/create` to create a thought

PUT `/api/thoughts/update/id` to update a thought by _id

DELETE `/api/thoughts/delete/id` to delete a thought by _id and all associated reactions

POST `/api/thoughts/id/reactions/add` to add a reaction to a specific thought

DELETE `/api/thoughts/thoughtID/reactions/delete/reactionID` to delete a specific reactionID from a specific thought ID

Link to project repository: [https://github.com/jrapich/social-media-API](https://github.com/jrapich/social-media-API)

## Tests
no tests needed. for usage of API, see above

## Credits
none

## Contributing
How to contribute:

Please reach out to me at jeremysr@protonmail.com or make a pull request at 

[https://github.com/jrapich/social-media-API](https://github.com/jrapich/social-media-API)

## Questions?
Any further questions, comments, or bug reports, can be sent to me at jeremysr@protonmail.com

https://www.github.com/jrapich

## License
This project protected under MIT License.

All rights reserved. See /LICENSE for more information.  