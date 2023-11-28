const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Menangani pesan yang dikirim dari klien
    // socket.on('privateChat', (data) => {
    //   console.log('------------privateChat------------');
    //   console.log(data);
    //   // Emit pesan ke semua klien yang terhubung
    //   io.emit(data.receiverPhoneNumber, data);
    // });

    // Listen to all events
    socket.onAny((event, data) => {
      // console.log('Received event:', event, 'with args:', data);
      // Handle the event here, based on the event name and arguments
      io.emit(data.receiverPhoneNumber, data);
    });

    // handle disconnect from event
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

module.exports = socketHandler;
