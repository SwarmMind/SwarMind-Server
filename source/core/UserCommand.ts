import Command from './Command';
import User from './User';

export default class UserCommand {
    public command: Command;
    public user: User;
    
    constructor(command: Command, user: User){
        this.command = command;
        this.user = user;
    }
}