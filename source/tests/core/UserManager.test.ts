import { expect } from 'chai';
import User from '../../../dist/core/User';
import UserManager from '../../../dist/core/UserManager';

describe('User', () => {
    it('can be constructed constructed', () => {
        const um = new UserManager();

        expect(um).not.to.equal(undefined);
    });

    it('can add a new User', () => {
        const um = new UserManager();
        const id = um.addUser();

        expect(id).not.to.equal(undefined);
    });

    it ('can find a user by id', () => {
        const um = new UserManager();
        const id = um.addUser();

        expect(um.getUserByID(id)).not.to.equal(null);
    });

    it ('cannot find a user by an id, that does not exist', () => {
        const um = new UserManager();
        const id = um.addUser();

        expect(um.getUserByID(id + 1)).to.equal(null);
    });

    it ('can remove a user by his id', () => {
        const um = new UserManager();
        const id = um.addUser();
        const success = um.removeUser(id);

        expect(success).not.to.equal(false);
        expect(um.getUserByID(id)).to.equal(null);
    });

    it('can not remove a user that does not exists', () => {
        const um = new UserManager();
        const id = um.addUser();
        const success = um.removeUser(id + 1);

        expect(success).to.equal(false);
    });

    it('supports iteration', () => {
        const um = new UserManager();
        const ids = [];
        for (let i = 0; i < 1337; i++) {
            ids[i] = um.addUser();
        }

        for (const user of um) {
            const id = user.getUserID();
            expect(ids.includes(id)).to.equal(true);
        }
    });
});
