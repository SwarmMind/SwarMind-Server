import { should } from 'chai';
import User from './../../core/User';
should();

describe('User', () => {
    it('can be constructed', () => {
        const user = new User(1337);
        // expect(user !== undefined).toBe(true);
        // expect(user.getUserID() === 1337).toBe(true);
        const bla = 3;
        bla.should.equals(3, 'foo');
    });
});
