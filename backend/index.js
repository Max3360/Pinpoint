// backend/index.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

const SECRET_KEY = "my-secret";
let users = [];
let pins = [];

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Auth route
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    users.push({ id: Date.now(), name, email, password: hashed });
    res.json({ message: "Registered" });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY);
    res.json({ token });
});

app.get("/pins", (req, res) => {
    res.json(pins);
});

// Socket.IO connection
io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("create-pin", (pin) => {
        pins.push(pin);
        io.emit("new-pin", pin);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(4000, () => console.log("Server on port 4000"));
