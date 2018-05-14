import { expect } from 'chai';
import UserManager from '../../../dist/core/UserManager';

describe('User', () => {
    it('can be constructed', () => {
        const um = new UserManager();

        expect(um).not.to.equal(undefined);
    });
});
