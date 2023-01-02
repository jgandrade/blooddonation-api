"use strict";
const db = require("../database");
const auth = require("../auth");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
module.exports.login = (req, res) => {
    let findUsername = `SELECT * FROM users where (username LIKE "${req.body.username}")`;
    db.query(findUsername, (err, result) => {
        if (err)
            return res.send("An error has occured.");
        if (result.length > 0) {
            let isPasswordCorrect = bcrypt.compareSync(req.body.password, result[0].password);
            if (isPasswordCorrect) {
                let createToken = {
                    id: result[0].id,
                    fullname: result[0].fullname,
                    bloodtype: result[0].bloodtype,
                    isAdmin: result[0].isAdmin,
                };
                let accessToken = auth.createWebToken(createToken);
                res.send({
                    accessToken: accessToken,
                    isAdmin: result[0].isAdmin,
                    response: true,
                });
            }
            else
                res.send({ status: "Password incorrect", response: false });
        }
        else
            res.send({ status: "Username not found", response: false });
    });
};
module.exports.register = (req, res) => {
    let userData = {
        username: req.body.username,
        fullname: req.body.fullname,
        password: bcrypt.hashSync(req.body.password, 10),
        age: req.body.age,
        address: req.body.address,
        bloodtype: req.body.bloodtype,
        mobile: req.body.mobile,
    };
    let sql = `INSERT INTO users (id,username,fullname,password,age,address,bloodtype,mobile) VALUES ("${uuidv4()}", "${userData.username}","${userData.fullname}","${userData.password}",${userData.age},"${userData.address}","${userData.bloodtype}","${userData.mobile}")`;
    db.query(sql, (err, result) => {
        if (err) {
            res.send({ status: "Duplicate Found", error: err, response: false });
        }
        else {
            res.send({ status: "Successfully Registered", response: true });
        }
    });
};
module.exports.verifySession = (req, res) => {
    let userData = auth.decode(req.headers.authorization);
    if (userData.isAdmin === 1)
        res.send({ response: true });
    else
        res.send({ response: false });
};
