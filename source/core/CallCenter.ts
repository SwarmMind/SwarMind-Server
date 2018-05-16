import app = require('express');
import http = require('http');
import sio = require('socket.io');

import Command from './Command';
import Connection from './Connection';
import Controller from './Controller';
import State from './State';

export default class CallCenter {
    private controller: Controller;
    private sockets: sio.Socket[] = [];
    private connections: Array<Connection>;

    constructor(controller: Controller, port: number) {
        this.controller = controller;
        this.connections = [];

        const server = http.createServer(app);    // Made APP to a function (thats how its used in the chat example)

        /*app().get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html');
        });
        app().get('/', (req, res) => {
            res.send('<h1>Hello world</h1>');
        });*/

        const io = sio(server);

        io.on('connection', (socket: sio.Socket) => {
            console.log('A client connected');

            // this.sockets.push(socket);
            const userID = this.controller.registerNewUser();
            const connection = new Connection(socket, userID);
            this.connections.push(connection);

            const initState = this.getJSONFromObject(this.controller.getInitState());
            socket.emit('initState', initState);

            socket.on('command', (unitID, type, direction) => {
                console.log('New command: Unit #' + unitID + ' has to ' + type + ' in direction ' + direction);

                const command = new Command(unitID, type, direction);
                this.controller.takeCommand(command, userID);
            });

            socket.on('disconnect', () => {
                console.log('A client disconnected');

                // this.sockets.splice(this.sockets.indexOf(socket), 1);
                this.connections.splice(this.connections.indexOf(connection), 1);
            });
        });

        server.listen(port, () => {
            console.log(`listening on Port: ${port}`);
        });
    }

    /**
     * sends game-state to all clients
     */
    public sendState(state: State) {
        const stateAsJSON = this.getJSONFromObject(state);

        for (const connection of this.connections) {
            const socket = connection.getSocket();
            socket.emit('state', stateAsJSON);
        }
        //console.log(stateAsJSON);
    }

    public informGameOver() {
        for (const connection of this.connections) {
            const socket = connection.getSocket();
            socket.emit('gameOver');
        }
        console.log('Game over');
    }

    private getJSONFromObject(object: any) {
        return JSON.stringify(object);
    }
}
