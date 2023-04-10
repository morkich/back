const User = require("../models/user");

const handleError = (response, error) => {
    response.status(500).json(error);
};

const getUser = async (request, response) => {
    try {
        const user = await User.findById(request.params.id).select("firstName secondName nickName");
        response.status(200).json(user);
    } catch (error) {
        handleError(response, error);
    }
};

module.exports = {
    getUser,
};
