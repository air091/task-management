const mongo = require("mongoose");

const userSchema = mongo.Schema({
    username: {
        type: String,
        required: [true, "Username is valid"],
        minlength: 6
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is already used"],
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
}, { timestamps: true });

const User = mongo.model("User", userSchema);
module.exports = User;