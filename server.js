const express = require("express");
const mongoose = require("mongoose");
const categoryRoutes = require("./routes/category-routes");

const PORT = 3000;
const databaseName = "m_kitchen";
const host = "localhost:27017";
const URL = `mongodb://${host}/${databaseName}`;

const app = express();
app.use(express.json());
app.use(categoryRoutes);

mongoose
    .connect(URL)
    .then(() => console.log("Подключились к mongo"))
    .catch(() => console.log("Не смог подключится к mongo"));
app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Сервак завелся на Порте ${PORT}`);
});
