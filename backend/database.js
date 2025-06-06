const mongo = require("mongoose");
require("dotenv/config");

const databaseConnection = mongo.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected"))
    .catch((error) => console.log("Connection failed:", error.message));

module.exports = databaseConnection;