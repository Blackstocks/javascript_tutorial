const WebSocket = require("ws");
const ws = new WebSocket("ws://localhost:4000");

ws.on("message", (data) => {
    console.log("live data: ", JSON.parse(data.toString()));
});

ws.on("open", () => {
    console.log("Connected to WebSocket server");
});

ws.on("close", () => {
    console.log("Disconnected from server");
});

ws.on("error", (err) => {
    console.error("Error:", err.message);
});