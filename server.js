const express = require("express");
const mongoose = require("mongoose");
const categoryRoutes = require("./routes/category-routes");
const authRoutes = require("./routes/auth-routes");
const roleRoutes = require("./routes/role-routes");

const PORT = 3000;
const databaseName = "m_kitchen";
const host = "localhost:27017";
const URL = `mongodb://${host}/${databaseName}`;

const app = express();
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(express.json());
app.use(categoryRoutes);
app.use(authRoutes);
app.use(roleRoutes);

mongoose
    .connect(URL)
    .then(() => console.log("Подключились к mongo"))
    .catch(() => console.log("Не смог подключится к mongo"));
app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Сервак завелся на Порте ${PORT}`);
});
