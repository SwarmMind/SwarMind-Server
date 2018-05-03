import * as sio from 'socket.io';

const io = sio();

io.onconnection(function() {
    console.log('A client connected');
});
