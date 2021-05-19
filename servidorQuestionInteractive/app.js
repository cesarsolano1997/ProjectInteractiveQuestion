// const express = require('express')
// const sokectIO = require('socket.io') // Configuration sokectio
// const http = require('http')

// const app = express()

// const cors = require('cors')
// // app.use(cors("http://localhost:3000"))

// let server = http.createServer(app)

// require('./config')
// require('./routes')

// // Configuration global routes
// app.use(require('./routes/index'))

// module.exports.io = sokectIO(server, {
//     cors: {
// 		origin: "http://localhost:3000/",
// 		methods: ["GET", "POST"]
// 	  }
// })
// require('./sockets/socket')

// server.listen(process.env.PORT, (err) => {

//     if (err) throw new Error(err);

//     console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);

// });

const app = require('express')
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
        cors: {
    		origin: "http://localhost:3000/",
    		methods: ["GET", "POST"]
    	  }
})

io.on("connection", (socket) => {
    console.log("Nuevo usuario  ",socket.id)
    socket.on("sendMessage", data => {
        console.log("Dato",data)
    })
});

server.listen(8000);