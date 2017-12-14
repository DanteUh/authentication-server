# Authentication Server

Basic Node.js Authentication server built with Express and MongoDB

This can be used as a boilerplate for future projects so you don't have to write everything from scratch

### Installation and Setup

1. Install and start MongoDB - C:\"Program Files"\MongoDB\Server\3.6\bin\mongod.exe
2. In package.json under scripts make sure you add this to use nodemon:
    
    ```javascript
      "dev": "nodemon index.js"
    ```
    
   Run nodemon to start the server, and refreshes itself on change - npm run dev
3. If you start a new project with this as a biolerplate you have to add a config.js with a custom secret:
    ```javascript
    module.exports = {
      secret: 'Just a random string of numbers and letters'
    };
    ```
    The secret __HAS TO__ be included in your .gitignore file

### Usage

To setup different routes and endpoints for your project, see 'router.js'

You can also look at Express [documentation]: https://expressjs.com/


### Libraries and Packages
* Express
* Mongoose
* HTTP
* Body Parser
* Nodemon
* Morgan
* Passport
* Jwt-simple
* Passport-jwt
* Passport-local
* bcrypt-nodejs
