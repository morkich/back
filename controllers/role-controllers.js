const Role = require("../models/role");

const handleError = (response, error) => {
    response.status(500).json(error);
};

const insertRole = (request, response) => {
    const role = new Role(request.body);
    role.save()
        .then((result) => {
            response.status(201).json(result);
        })
        .catch((error) => handleError(response, error));
};

module.exports = {
    insertRole,
};
