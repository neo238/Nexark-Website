const express = require("express");
const app = express();
var http = require('http').Server(app);
const port = process.env.PORT;
var io = require('socket.io')(http);

const users = {}

//Database
const Database = require("@replit/database");
const db = new Database();

app.use(express.static("public"));

app.get('/', (req, res) => {
	res.status(200).sendFile(__dirname + "/views/index.html");
});

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})

http.listen(port);