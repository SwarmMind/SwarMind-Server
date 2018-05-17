import CallCenter from './CallCenter';
import Command from './Command';
import Game from './Game';
import Overmind from './Overmind';
import UserCommand from './UserCommand';
import UserManager from './UserManager';
import NPCObject from './NPCObject';

export default class Controller {
    private callCenter: CallCenter;
    private game: Game;
    private overmind: Overmind;

    private intervalID: any;         // for the handle returned by setInterval()
    private serverPort: number;

    private userManager: UserManager;   // maybe we should reset the users to on restart?

    public constructor(port: number = 3000) {
        this.serverPort = port;
        this.initKeyClasses();
    }

    private initKeyClasses() {
        this.callCenter = new CallCenter(this, this.serverPort);
        this.game = new Game();
        this.overmind = new Overmind();

        this.userManager = new UserManager();
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
        this.setInterval(5 * 1000);
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
    public takeCommand(command: Command, userID: number) {
        const user = this.userManager.getUserByID(userID);
        const userCommand = new UserCommand(command, user);

        this.overmind.takeCommand(userCommand);
    }

    public getInitState(): any {
        const gameState = this.game.getState().makeAny();
        const initState = {
            state: gameState,
            config: {
                sizeX: this.game.getSize().x,
                sizeY: this.game.getSize().y,
            },
        };

        return initState;
    }

    private processRound() {
        this.game.newRound(this.overmind.getCommandPriorities());
        this.overmind.resetCommands();

        if (this.game.isGameOver()) {
            this.setGameOver();
            return;
        }

        this.callCenter.sendState(this.game.getState());
        this.updateBiases();

        console.log('new round!');
        console.log(this.game.world.fieldContents.map(row => row.map(x => x == null ? '.' : x instanceof NPCObject ? 'x' : 'o')));
    }

    private setGameOver() {
        this.callCenter.informGameOver();
        // Should be killed here
    }

    private updateBiases() {
        for (const user of this.userManager) {
            user.setWeight(1);
        }

        for(const userID of this.overmind.getUsersToUpgrade()){
            this.userManager
                .getUserByID(userID)
                .updateWeigthBy(0.3);
        }
    }

    public registerNewUser(): number {
        return this.userManager.addUser();
    }
}
