import Command from './Command';
import UserCommand from './UserCommand';

export default class Overmind {
    private commandCountToSelect: number = 5;
    public commands: Command[] = [];

    private selectCommand(): Command {
        return;
    }

    /**
     * returns the commands, that was choosen to be executed
     */
    public getSelectedCommands(): Command[] {
        let commands: Command[] = [];

        for (let i = 0; i < this.commandCountToSelect; i++) {
            commands.push(this.selectCommand());
        }

        return commands;
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
