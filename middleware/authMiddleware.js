const jwt = require("jsonwebtoken");
const { secret } = require("../config");
const express = require("express");

module.exports = () => (request, response, next) => {
    if (request.method === "OPTIONS") {
        next();
    }

    // response.cookie("token2", "12345ABCDE");

    console.log(request);
    console.log(request.cookies);
    console.log(request.signedCookies);

    // console.log(secret, request);

    // app.get("/", (req, res) => {
    //     console.log("Cookie: ", req.cookies);
    //     res.send("Get Cookie");
    // });

    try {
        // app.get("/", (req, res) => {
        //     console.log(req, res);
        //     res.send("hello world");
        // });

        // const token = request.headers.authorization.split(" ")[1];
        // if (!token) {
        //     response.status(403).json({ message: "Пользователь не авторизован!" });
        // }
        // const userData = jwt.verify(token, secret);
        // let hasRole = false;
        // roles.forEach((role) => {
        //     if (userData.role.includes(role)) {
        //         hasRole = true;
        //     }
        // });

        // if (!hasRole) {
        //     return response.status(403).json({ message: "Не хватает прав!" });
        // }
        next();
    } catch (error) {
        return response.status(403).json({ message: `Пользователь не авторизован! ${error}` });
    }
};
