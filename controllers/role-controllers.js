const Role = require("../models/role");

const handleError = (response, error) => {
    response.status(500).json(error);
};

const insertRole = (request, response) => {
    try {
        const role = new Role(request.body);
        role.save();
        return response.status(200).json({ message: "Роль создана!" });
    } catch (error) {
        handleError(response, error);
    }
};

module.exports = {
    insertRole,
};
