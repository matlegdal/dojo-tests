var express = require("express"),
    bodyParser = require("body-parser"),
    app = express();

app.set("view engine", "ejs");
app.use(express.static("."));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.render("index");
});

app.post("/login", function (req, res) {
    var user = req.body.user,
        password = req.body.password;

    if (user === "mat" && password === "123") {
        setTimeout(function () {
            res.status(200).sendFile(__dirname + "/texts/secret.txt");
        }, 5000);
    } else {
        setTimeout(function () {
            res.status(401).send("Wrong login");
        }, 5000);

    }
});

app.listen(8080, "127.0.0.1", function () {
    console.log("Server started. Listenning on localhost:8080");
});