const registerSocketEvents = (socket, io) => {

  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });

};

module.exports = registerSocketEvents;