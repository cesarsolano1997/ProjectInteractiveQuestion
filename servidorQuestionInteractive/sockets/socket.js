const { io } = require('../app')

io.on("connection", socket => {

	socket.on("message.chat1", data => {
		console.log( data );
		messages.push(data);
		socket.broadcast.emit("message.chat1", data);
	});
});