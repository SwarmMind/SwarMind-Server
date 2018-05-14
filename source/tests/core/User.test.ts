import { expect } from 'chai';
import User from './../../core/User';

describe('User', () => {
    it('can be constructed', () => {
        const user = new User(1337);
        const bla = 3;
        expect(bla).to.equal(3);
    });
});
