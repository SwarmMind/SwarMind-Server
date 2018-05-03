import CallCenter from './CallCenter';
import Game from './Game';
import Overmind from './Overmind';
import UserCommand from './UserCommand';

export default class Controller {
    private callCenter: CallCenter;
    private game: Game;
    private overmind: Overmind;


    /**
     * starts a new game and the time loop
     */
    public start() {
        this.game.start();
        setInterval(() => {
            this.overmind.getSelectedCommands();
            this.callCenter.sendState(this.game.getState());
        }, 10 * 1000);
    }

    /**
     * initializes new game and starts it
     */
    public restart() {

    }

    /**
     * takes command and gives it to the overmind-object
     * @param command command to be given to the overmind
     */
    public takeCommand(command: UserCommand) {
        this.overmind.takeCommand(command);
    }
}
