let express = require("express");

let PORT = process.env.PORT || 8080;
let app = express();

//static content for the app from the public directory
app.use(express.static("public"));

//parse body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set handle bars
let exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//import routes to give server access
let routes = require("./controllers/burgers_controller.js");

app.use(routes);

//start server so it can listen
app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:", PORT);
});