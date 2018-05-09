import Command from './Command';
import UserCommand from './UserCommand';
import UserCommandCollection from './UserCommandCollection';

export default class Overmind {
    // private commandCountToSelect = 5;
    // private commands: UserCommand[] = [];
    private userCommands: UserCommandCollection;
    private userToUpgrade: Array<number>;

    constructor() {
        this.userCommands = new UserCommandCollection();
    }

    /**
     * @deprecated
     * @param commandList List of commands to select one from
     */
    private selectCommand(commandList: Array<UserCommand>): Command {
        return commandList.pop().getCommand();
    }

    private prioritizeCommands(commandList: Array<UserCommand>): Array<Command> {
        const prioritizedCommands: Array<Command> = [];

        const commandsUnique: Array<Command> = [];
        const commandCounter: Array<number> = [];
        const userIDs: Array<Array<number>> = [];

        commandList.forEach((userCommand) => {
            const command = userCommand.getCommand();
            const user = userCommand.getUser();

            /*for (let i = 0; i < commandsUnique.length; i++) {
                const uniqueCommand = commandsUnique[i];
                if (command.equals(uniqueCommand)) {
                    commandCounter[i] += user.getWeight();
                    userIDs[i].push(user.getUserID());
                    // Does this really continue to the next iteration of the forEach loop?
                    // Yeah it does
                    return;
                }
            }*/

            const index = commandsUnique.findIndex((uniqueCommand) => command.equals(uniqueCommand));

            if (index === -1) {
                commandCounter[index] += user.getWeight();
                userIDs[index].push(user.getUserID());
            } else {
                commandsUnique.push(command);
                commandCounter.push(user.getWeight());
                userIDs.push([user.getUserID()]);
            }
        });

        let usersAdded = false;

        while (prioritizedCommands.length < commandsUnique.length) {
            // All this sorting stuff could be implemented more efficiently
            // Later on we should think about negative weights
            let index = 0;
            let maxWeight = 0;

            for (let i = 0; i < commandCounter.length; i++) {
                const commandWeight = commandCounter[i];
                if (commandWeight > maxWeight) {
                    index = i;
                    maxWeight = commandWeight;
                }
            }

            prioritizedCommands.push(commandsUnique[index]);
            commandsUnique.splice(index, 1);
            commandCounter.splice(index, 1);

            if (!usersAdded) {
                usersAdded = true;
                userIDs[index].forEach((userID) => {
                    this.userToUpgrade.push(userID);
                });
            }
        }

        return prioritizedCommands;
    }

    /**
     * @deprecated
     * returns the commands, that was choosen to be executed
     */
    public getSelectedCommands(): Command[] {
        const selectedCommands: Command[] = [];

        const commandLists = this.userCommands.getListsByUnit();
        commandLists.forEach((commandList) => {
            selectedCommands.push(this.selectCommand(commandList));
        });

        return selectedCommands;

        /*for (let i = 0; i < this.commandCountToSelect; i++) {
            selectedCommands.push(this.selectCommand());
        }

        return selectedCommands;*/
    }

    public getCommandPriorities(): Array<Array<Command>> {
        // const priorityLists: Array<Array<Command>> = [];
        this.userToUpgrade = [];

        const priorityLists = this.userCommands
                                    .getListsByUnit()
                                    .map((commandList) => this.prioritizeCommands(commandList));

        return priorityLists;
    }

    /**
     * adds userCommand to commands-array
     * @param userCommand the command to be added
     */
    public takeCommand(userCommand: UserCommand) {
        this.userCommands.addCommand(userCommand);
    }

    /**
     * flushes commands-array
     */
    public resetCommands() {
        this.userCommands = new UserCommandCollection();
        // this.commands = [];
    }

    public getUsersToUpgrade(): Array<number> {
        return this.userToUpgrade;
    }
}
