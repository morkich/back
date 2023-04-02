const express = require("express");
const mongoose = require("mongoose");
const Category = require("./models/category");

const PORT = 3000;
const databaseName = "m_kitchen";
const host = "localhost:27017";
const URL = `mongodb://${host}/${databaseName}`;

const app = express();
app.use(express.json());

mongoose
    .connect(URL)
    .then(() => console.log("Подключились к mongo"))
    .catch(() => console.log("Не смог подключится к mongo"));
app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Сервак завелся на Порте ${PORT}`);
});

app.get("/categories", (request, response) => {
    Category.find()
        .sort({ title: 1 })
        .then((categories) => {
            response.status(200).json(categories);
        })
        .catch(() => handleError(response, "Категории все!"));
});

app.get("/categories/:id", (request, response) => {
    Category.findById(request.params.id)
        .then((category) => {
            response.status(200).json(category);
        })
        .catch(() => handleError(response, "Категории все!"));
});

app.delete("/categories/:id", (request, response) => {
    Category.findByIdAndDelete(request.params.id)
        .then((result) => {
            response.status(200).json(result);
        })
        .catch(() => handleError(response, "Категории все!"));
});

app.post("/categories", (request, response) => {
    const category = new Category(request.body);
    category
        .save()
        .then((result) => {
            response.status(201).json(result);
        })
        .catch(() => handleError(response, "Категории все!"));
});

app.patch("/categories/:id", (request, response) => {
    Category.findByIdAndUpdate(request.params.id, request.body)
        .then((result) => {
            response.status(200).json(result);
        })
        .catch(() => handleError(response, "Категории все!"));
});

const handleError = (response, error) => {
    response.status(500).json(error);
};
