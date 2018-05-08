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

    public getUserByID(ID: number): User {
        for (let i = 0; i < this.users.length; i++) {
            const user = this.users[i];
            if (user.getUserID() === ID) { 
                return user; 
            }
        }

        return null;
    }

    public removeUser(userID: number) {
        for (let i = 0; i < this.users.length; i++) {
            const user = this.users[i];
            if (user.getUserID() === userID) {
                this.users.splice(i, 1);
                return true;
            }
        }

        return false;
    }

    *[Symbol.iterator]() {
        for (const mapObject of this.users) {
            yield mapObject;
        }
    }
}
