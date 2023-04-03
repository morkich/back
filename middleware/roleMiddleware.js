const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = (roles) => (request, response, next) => {
    if (request.method === "OPTIONS") {
        next();
    }

    try {
        const token = request.headers.authorization.split(" ")[1];
        if (!token) {
            response
                .status(403)
                .json({ message: "Пользователь не авторизован!" });
        }
        const userData = jwt.verify(token, secret);
        let hasRole = false;
        roles.forEach((role) => {
            if (userData.role.includes(role)) {
                hasRole = true;
            }
        });

        if (!hasRole) {
            return response.status(403).json({ message: "Не хватает прав!" });
        }
        next();
    } catch (error) {
        return response
            .status(403)
            .json({ message: `Пользователь не авторизован! ${error}` });
    }
};
