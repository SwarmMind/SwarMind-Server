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

        this.commands.forEach((command) => {
            const ID = command.getCommand().getUnitID();

            if (unitIDList.includes(ID)) {
                const index = unitIDList.indexOf(ID);
                listArray[index].push(command);
            } else {
                unitIDList.push(ID);
                listArray.push([command]);
            }
        });

        return listArray;
    }
}
