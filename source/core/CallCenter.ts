
import APP = require('express');
import HTTP = require('http');
import SIO = require('socket.io');

import Command from './Command';
import Connection from './Connection';
import Controller from './Controller';
import State from './State';

export default class CallCenter {
    private controller: Controller;
    // private sockets: SIO.Socket[] = [];
    private connections: Array<Connection>;

    constructor(controller: Controller, port: number) {
        this.controller = controller;

        const server = HTTP.createServer(APP);
        const io = SIO(server);

        io.on('connection', function(socket: SIO.Socket) {
            console.log('A client connected');

            // this.sockets.push(socket);
            const userID = this.controller.registerNewUser();
            const connection = new Connection(socket, userID);
            this.connections.push(connection);

            socket.on('command', (unitID, type, direction) => {
                console.log('New command: Unit #' + unitID + ' has to ' + type + ' in direction ' + direction);
                const command = new Command(unitID, type, direction);
                // Seems like the cope is wrong. How to do it right?
                this.controller.takeCommand(command, userID);
            });

            socket.on('disconnect', () => {
                // this.sockets.splice(this.sockets.indexOf(socket), 1);

                // Seems like the cope is wrong. How to do it right?
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
        const stateAsJSON = this.getJSONFromState(state);
        /*for (const socket of this.sockets) {
            socket.emit('state', stateAsJSON);
        }*/
        for (const connection of this.connections) {
            const socket = connection.getSocket();
            socket.emit('state', stateAsJSON);
        }
    }

    private getJSONFromState(state: State) {
        return state.serialize();
    }
}
