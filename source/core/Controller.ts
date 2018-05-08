import CallCenter from './CallCenter';
import Game from './Game';
import Overmind from './Overmind';
import UserCommand from './UserCommand';

export default class Controller {
    private callCenter: CallCenter;
    private game: Game;
    private overmind: Overmind;

    private intervalID: any;         // for the handle returned by setInterval()
    private serverPort: number;

    public constructor(port: number = 3000) {
        this.serverPort = port;
        this.initKeyClasses();
    }

    private initKeyClasses() {
        this.callCenter = new CallCenter(this, this.serverPort);
        this.game = new Game();
        this.overmind = new Overmind();
    }

    private setInterval(duration: number) {         // if the function is not binded it does not know the this context
        this.intervalID = setInterval(this.processRound.bind(this), duration);
    }

    private clearInterval() {
        clearInterval(this.intervalID);
    }

    /**
     * starts a new game and the time loop
     */
    public start(width: number, height: number) {
        this.game.start(width, height);
        this.setInterval(10 * 1000);
    }

    /**
     * initializes new game and starts it
     */
    public restart(width: number, height: number) {
        this.clearInterval();
        this.initKeyClasses();
        this.start(width, height);
    }

    /**
     * takes command and gives it to the overmind-object
     * @param command command to be given to the overmind
     */
    public takeCommand(command: UserCommand) {
        this.overmind.takeCommand(command);
    }

    private processRound() {
        const commandLists = this.overmind.getCommandPriorities();

        this.overmind.resetCommands();
        this.game.newRound(commandLists);
        this.callCenter.sendState(this.game.getState());
    }
}
