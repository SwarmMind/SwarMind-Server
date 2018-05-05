import Command from './Command';
import State from './State';
import World from './World';

export default class Game {
    private world: World;
    private round: number;      // could an overflow occur???

    public getRound() {
        return this.round;
    }

    /**
     * starts a new round
     */
    public newRound(commandLists: Array<Array<Command>>) {
        // this.processCommands(commands);

        this.processCommandLists(commandLists);
        this.round++;
    }

    /**
     * starts a new game
     * @param width width of new game-world
     * @param height height of new game-world
     */
    public start(width: number, height: number) {
        this.round = 0;
        this.world = new World(width, height);
    }

    /**
     * restarts the current game
     */
    public restart(width: number, height: number) {
        this.start(width, height);
    }

    /**
     * returns the state-object that represents the current game-state
     */
    public getState(): State {
        return this.world.getState();
    }

    /**
     * integrated commands in game-state
     * @param commands selected commands to be integrated in game-state
     */
    /*private processCommands(commands: Command[]) {
        for (const command of commands) {
            this.processCommand(command);
        }
    }*/

    private processCommand(command: Command) {
        console.log(command);
    }

    // TODO: Implement correctly
    private processCommandLists(commandLists: Array<Array<Command>>) {
        commandLists.forEach((commandList) => {
            commandList.forEach((command) => {
                this.processCommand(command);
            });
        });
    }
}
