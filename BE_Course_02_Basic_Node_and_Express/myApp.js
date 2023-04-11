let express = require('express');
let app = express();
let bodyParser = require('body-parser')
  
// #4 - Serve Static Assets
app.use("/public", express.static(__dirname + "/public"));

// #11 - Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// #1 - Meet the Node console
/*
console.log("Hello World");
*/

// #2 - Start a Working Express Server
/*
app.get("/", function(req, res) {
  res.send("Hello Express");
});
*/

// #5 - Serve JSON on a Specific Route
/*
app.get("/json", function(req, res) {
  res.json({"message": "Hello json"});
});
*/

// #7 - Implement a Root-Level Request Logger Middleware
app.use(function middleware(req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

// #3 - Serve an HTML File
app.get("/", function(req, res) {
  absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
});

// #6 - Use the .env File
app.get("/json", function(req, res) {
  if (process.env['MESSAGE_STYLE'] === "uppercase") {
    res.json({ "message": "Hello json".toUpperCase() });
  } else {
    res.json({ "message": "Hello json" });
  }
});

// #8 - Chain Middleware to Create a Time Server
app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({ "time": req.time });
});

// #9 -  Get Route Parameter Input from the Client
app.get("/:word/echo", function(req, res) {
  res.json({ "echo": req.params.word });
});

// #10 - Get Query Parameter Input from the Client
app.get("/name", function(req, res) {
  var { first: firstName, last: lastName } = req.query;
  res.json({ "name": firstName + " " + lastName});
});

// #12 - Get Data from POST Requests
app.post("/name", function(req, res) {
  var { first: firstName, last: lastName } = req.body;
  res.json({ "name": firstName + " " + lastName});
});

module.exports = app;
