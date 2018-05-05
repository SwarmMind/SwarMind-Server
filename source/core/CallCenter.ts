import * as sio from 'socket.io';
import Controller from './Controller';
import State from './State';
import UserCommand from './UserCommand';

export default class CallCenter {
    private controller: Controller;
    private sockets: sio.Socket[] = [];

    constructor(controller: Controller) {
        this.controller = controller;

        const io = sio();

        io.onconnection(function(socket: sio.Socket) {
            console.log('A client connected');

            this.sockets.push(socket);

            socket.on('disconnect', () => {
                this.sockets.splice(this.sockets.indexOf(socket), 1);
            });
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
