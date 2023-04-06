const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("../config");

const handleError = (response, error) => {
    response.status(500).json(error);
};

const registration = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            handleError(response, errors);
        }
        const { username, password } = request.body;
        const candidate = await User.findOne({ username });
        if (candidate) {
            return response.status(400).json({ message: "такой пользователь уже есть" });
        }
        const salt = bcrypt.genSaltSync(7);
        const hashPassword = bcrypt.hashSync(password, salt);
        const userRole = await Role.findOne({ value: "user" });
        const user = new User({
            username,
            password: hashPassword,
            roles: [userRole.value],
        });
        user.save();
        return response.status(200).json({ message: "Пользователь зарегистрирован!" });
    } catch (error) {
        handleError(response, error);
    }
};

const login = async (request, response) => {
    try {
        const { username, password } = request.body;
        const user = await User.findOne({ username });
        if (!user) {
            return response.status(400).json({ message: "Такого пользователя не существует!" });
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return response.status(400).json({ message: "Введен неверный пароль!" });
        }
        const token = generateAccessToken(user._id, user.roles);
        return response.status(200).json({ token, user });
    } catch (error) {
        handleError(response, error);
    }
};

const authUser = async (request, response) => {
    const token = request.body.token;
    if (!token) {
        return response.status(403).json({ message: "Пользователь не авторизован!" });
    }
    const decodedData = jwt.verify(token, secret);
    const user = await User.findById(decodedData.id);
    if (!user) {
        return response.status(403).json({ message: "Произошло что-то странное!" });
    }
    return response.status(200).json({ token, user });
};

const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role,
    };
    return jwt.sign(payload, secret, { expiresIn: "24h" });
};

module.exports = {
    login,
    registration,
    authUser,
};
