const Tool = require("../models/tool");

const handleError = (response, error) => {
    response.status(500).json(error);
};

const getTools = async (request, response) => {
    try {
        let tools = [];
        if (request.query.ids) {
            const toolsIds = request.query.ids.split(",");
            tools = await Tool.find({ _id: { $in: toolsIds } });
        } else {
            tools = await Tool.find();
        }
        response.status(200).json(tools);
    } catch (error) {
        handleError(response, error);
    }
};

module.exports = {
    getTools,
};
