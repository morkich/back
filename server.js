const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const categoryRoutes = require("./routes/category-routes");
const authRoutes = require("./routes/auth-routes");
const roleRoutes = require("./routes/role-routes");
const recipeRoutes = require("./routes/recipe-routes");
const userRoutes = require("./routes/user-routes");
const toolRoutes = require("./routes/tool-routes");
const ingredientRoutes = require("./routes/ingredient-routes");
const { secret } = require("./config");

const PORT = 3000;
const databaseName = "m_kitchen";
const host = "localhost:27017";
const URL = `mongodb://${host}/${databaseName}`;

const app = express();

app.use(cookieParser(secret));
app.use((require, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    response.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(express.json());
app.use(categoryRoutes);
app.use(authRoutes);
app.use(roleRoutes);
app.use(recipeRoutes);
app.use(userRoutes);
app.use(toolRoutes);
app.use(ingredientRoutes);

mongoose
    .connect(URL)
    .then(() => console.log("Подключились к mongo"))
    .catch(() => console.log("Не смог подключится к mongo"));
app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Сервак завелся на Порте ${PORT}`);
});

// app.get("/", (req, res) => {
//     console.log("Cookie: ", req.cookies);
//     res.send("Get Cookie");
// });
