export default class Command {
    private type: string;
    private direction: string;

    constructor(type, direction) {
        this.type = type;
        this.direction = direction;
    }

    public getType() {
        return this.type;
    }

    public getDirection() {
        return this.direction;
    }
}
