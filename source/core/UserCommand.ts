import Command from './Command';
import User from './User';

export default class UserCommand {
    private command: Command;
    private user: User;

    constructor(command: Command, user: User) {
        this.command = command;
        this.user = user;
    }

    public getCommand() {       // js getter???
        return this.command;
    }

    public getUser() {          // js getter???
        return this.user;
    }
}
