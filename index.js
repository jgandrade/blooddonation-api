"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var express_1 = require("express");
var cors_1 = require("cors");
dotenv_1["default"].config();
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use((0, cors_1["default"])());
app.get('/', function (req, res) {
    res.json({ user: ["kyle", "dominic"] });
});
app.get('/bloodbank', function (req, res) {
    res.json({ blood: ["A", "B"] });
});
app.get('/login', function (req, res) {
    res.json({ login: ["user1", "user2"] });
});
app.get('/team', function (req, res) {
    res.json({ user: ["kyle", "dominic"] });
});
var port = process.env.PORT || 8000;
app.listen(port, function () {
    console.log("listening on port ".concat(port));
});
