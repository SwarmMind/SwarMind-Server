import { expect } from 'chai';
import User from './../../core/User';

describe('User', () => {
    it('gets correctly constructed and has working getters and setters', () => {
        const user = new User(1337);
        user.setWeight(42);

        expect(user).not.to.equal(undefined);
        expect(user.getUserID()).to.equal(1337);
        expect(user.getWeight()).to.equal(42);
    });
});
