import CallCenter from './CallCenter';
import Game from './Game';
import Overmind from './Overmind';
import UserCommand from './UserCommand';

export default class Controller {
    private callCenter: CallCenter;
    private game: Game;
    private overmind: Overmind;

    private intervalID: number;         // for the handle returned by setInterval()

    public constructor() {
        this.initKeyClasses();
    }

    private initKeyClasses() {
        this.callCenter = new CallCenter(this);
        this.game = new Game();
        this.overmind = new Overmind();
    }

    private setInterval(duration: number) {
        this.intervalID = window.setInterval(() => {        // window before setInterval only because of typescript
            this.game.newRound(this.overmind.getSelectedCommands());
            this.callCenter.sendState(this.game.getState());
        }, duration);
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
}
