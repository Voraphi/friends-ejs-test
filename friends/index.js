/* EJS : Embedded JavaScript
   1. NodeJS looks for ekjs files in 'views'
   2. ejs files end with .ejs
   3. Have to let the NodeJs engine know that we are using ejs
*/


var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(express.static("css"));
app.use(bodyParser.urlencoded( { extended : true } ));
app.set("view engine", "ejs");

app.get("/", function(request, response) {
    // response.send("Hello World!");
    response.render("home");
});

var friendList = ["Alice", "Clark", "Bellemy", "Octavia"];

app.get("/friends", function(request, response) {
   response.render("friends", {friends : friendList});
});

app.post("/addfriend", function(request, response) {
    // console.log(request.body);
    var newfriend = request.body.newfriend;
    friendList.push(newfriend);
    response.redirect("/friends");
});

app.get("*", function(request, response) {
    // response.send("Page Not Found");
    response.render("error");
});

app.listen(process.env.PORT, function() {
    console.log("Sever is up and running");
});