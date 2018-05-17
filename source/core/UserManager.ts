import User from './User';

export default class UserManager implements Iterable<User> {
    private users: Array<User>;
    private lastID: number;

    constructor() {
        this.users = [];
        this.lastID = 0;
    }

    public addUser() {
        const ID = this.lastID + 1;
        const user = new User(ID);
        this.lastID++;
        this.users.push(user);

        return ID;
    }

    public getUserByID(userID: number): User {   //otherwise would return undefined if ID not found
        return this.users.find(user => user.getUserID() === userID) || null;
    }

    public removeUser(userID: number) {
        const index = this.users.findIndex(user => user.getUserID() === userID)

        if(index >= 0){
            this.users.splice(index, 1)
            return true
        }

        return false;
    }

    *[Symbol.iterator]() {
        for (const mapObject of this.users) {
            yield mapObject;
        }
    }
}
