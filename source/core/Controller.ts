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
    public start(){
        this.game.start();
        setInterval(() => {
            this.overmind.getSelectedCommands();
            this.callCenter.sendState(this.game.getState());
        }, 10 * 1000);
    }

    /**
     * initializes new game and starts it
     */
    public restart(){

    }

    /**
     * 
     * @param command 
     */
    public takeCommand(command: UserCommand){
        this.overmind.takeCommand(command);
    }
}
