export default class User {
    private userID: number;
    private weight: number;

    constructor(ID) {
        this.userID = ID;
        this.weight = 1;
    }

    public getUserID(): number {
        return this.userID;
    }

    public getWeight(): number {
        return this.weight;
    }

    public setWeight(newWeight: number) {
        this.weight = newWeight;
    }
}
