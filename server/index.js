const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const {addUser, removeUser, getUser, getUsersInRoom, tempPrintAllUsers} = require('./users');

const PORT = process.env.PORT || 5000;

const router =  require('./router');
const { Console } = require('console');
const { disconnect } = require('process');

const app = express();
const server = http.createServer();
const io = socketio(server);

//----------------------------------------------------
io.on('connection', socket=> {
    console.log('We have a new connection!!!');

    //Specify our new event from client
    socket.on('join', ({name, room}, callback) => {
        console.log("Attempt to join;\nName: " + name + "\nRoom: "+ room + ";");
        const {error, user} = addUser({id: socket.id, name, room});

        if(error) {
            console.log('Error occurred when trying to add user!');
            //alert("Error occured: can not addthe same user");
            socket.emit('disconnect');
            return callback(user);
        }

        socket.emit('message', {user: 'admin', text: `${name}, welcome to room ${room}`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${name} has joined`});

        socket.join(user.room);

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)}); //get anounced about all users in current room

        callback();//For some reason this function must always been run if it exists
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        
        if(!user) {
            console.log("Could not find user, may be name already exists");
            return {error: "Could not find user, may be name already exists"};
        }

        io.to(user.room).emit('message', {user: user.name, text: message}); //Send message from a specific user to all members of the room
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
        callback(); //If will be launched when message will be sent
    });

    socket.on('disconnect', () => {
        console.log("User has just left!!!");
        tempPrintAllUsers();
        const user = removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left us.`});
        }
    });
});
//----------------------------------------------------
app.use(router);
app.use(cors());

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));