import Command from './Command';
import State from './State';
import World from './World';

export default class Game {
    public world: World;
    private round: number;      // could an overflow occur???

    /**
     * starts a new round
     */
    public newRound(commands: Command[]) {
        this.processCommands(commands);
        this.round++;
    }

    /**
     * starts a new game
     */
    public start() {

    }

    /**
     * restarts the current game
     */
    public restart() {

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
    private processCommands(commands: Command[]) {
        for (const command of commands) {
            this.processCommand(command);
        }
    }

    private processCommand(command: Command) {

    }
}
