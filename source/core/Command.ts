export default class Command {
    private unitID: string;
    // Has to be one of 'move' or 'shoot'
    private type: string;
    // Has to be one of 'north', 'south', 'east' or 'west'
    private direction: string;

    constructor(unitID, type, direction) {
        this.unitID = unitID;
        this.type = type;
        this.direction = direction;
    }

    public getUnitID() {
        return this.unitID;
    }

    public getType() {
        return this.type;
    }

    public getDirection() {
        return this.direction;
    }

    public equals(otherCommand: Command) {
        if (otherCommand.getUnitID() !== this.unitID) { return false; }
        if (otherCommand.getType() !== this.type) { return false; }
        if (otherCommand.getDirection() !== this.direction) { return false; }

        return true;
    }
}
