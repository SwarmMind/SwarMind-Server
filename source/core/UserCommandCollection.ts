import UserCommand from './UserCommand';

export default class UserCommandCollection {
    private commands: Array<UserCommand>;

    constructor() {
        this.commands = [];
    }

    public addCommand(command: UserCommand) {
        this.commands.push(command);
    }

    public getListsByUnit(): Array<Array<UserCommand>> {
        const listArray: Array<Array<UserCommand>> = [];
        const unitIDList: Array<string> = [];

        for(const command of this.commands) {
            const ID = command.getCommand().getUnitID();
            const index = unitIDList.indexOf(ID);

            if (index !== -1) {                          // ID is in unitIDList
                listArray[index].push(command);
            } else {
                unitIDList.push(ID);
                listArray.push([command]);
            }
        }

        return listArray;
    }
}
