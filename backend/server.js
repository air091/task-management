const express = require("express");
require("dotenv/config");
const cors = require("cors");
const databaseConnection = require("./database.js");
const User = require("./models/user.model.js");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// sign up
app.post("/api/user/signup", async (request, response) => {
    const { username, email, password } = request.body;
    try {
        const user = new User({ username, email, password });
        await user.save();

        return response.status(201).json({ status: true, user });
    } catch (error) {
        console.log("Error:", error.message);
        return response.status(500).json({ status: false, message: error.message });
    }
});
// sign in
app.post("/api/user/signin", async (request, response) => {
    const { usernameOrEmail, password } = request.body;
    try {
        const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }], password });
        if (!user) {
            return response.status(401).json({ success: true, message: "Invalid username or password" });
        }
        return response.status(200).json({ message: "login successfully" });
    } catch (error) {
        console.log("Error:", error.message);
        return response.status(500).json({ status: false, message: error.message });
    }
});

app.listen(port, () => {
    console.log("Server is up...", port);
    databaseConnection;
});