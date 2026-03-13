const io = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
    console.log("Connected to server");
    console.log("Socket ID:", socket.id);

    // Example event
    socket.emit("test-event", { message: "Hello from backend test client" });
});

socket.on("disconnect", () => {
    console.log("Disconnected from server");
});

// Listen for events from server
socket.on("result-update", (data) => {
    console.log("Received result update:", data);
});


