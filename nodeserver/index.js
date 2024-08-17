const io = require('socket.io')(8000, {cors: {origin: "*"}});

const users = {};

io.on('connection', socket => {
    // When a new user joins
    socket.on('new-user-joined', name => {
        console.log("New user:", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    // When a user sends a message
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    // When a user disconnects
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});
