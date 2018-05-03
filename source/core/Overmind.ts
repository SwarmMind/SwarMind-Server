import Command from './Command';
import UserCommand from './UserCommand';

export default class Overmind {
    public commands: Command[] = [];

    /**
     * returns the commands, that was choosen to be executed
     */
    public getSelectedCommands(): Command[] {
        return ;
    }
    /**
     * adds userCommand to commands-array
     * @param userCommand the command to be added
     */
    public takeCommand(userCommand: UserCommand) {
        this.commands.push(userCommand);
    }
    /**
     * flushes commands-array
     */
    public resetCommands() {
        this.commands = [];
    }
}
