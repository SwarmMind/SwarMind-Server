
import APP = require('express');
import HTTP = require('http');
import SIO = require('socket.io');

import Controller from './Controller';
import State from './State';
import UserCommand from './UserCommand';

export default class CallCenter {
    private controller: Controller;
    private sockets: SIO.Socket[] = [];

    constructor(controller: Controller, port: number) {
        this.controller = controller;

        const server = HTTP.createServer(APP);
        const io = SIO(server);

        io.onconnection(function(socket: SIO.Socket) {
            console.log('A client connected');

            this.sockets.push(socket);

            socket.on('disconnect', () => {
                this.sockets.splice(this.sockets.indexOf(socket), 1);
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
        for (const socket of this.sockets) {
            socket.emit('state', stateAsJSON);
        }
    }

    private getJSONFromState(state: State) {
        return state.serialize();
    }

    // TODO: should not be public
    public receiveCommand(command: UserCommand) {
        this.controller.takeCommand(command);
    }
}
