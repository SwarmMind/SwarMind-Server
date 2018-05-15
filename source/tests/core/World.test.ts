import { expect } from 'chai';
import World from './../../core/World';

describe('World', () => {
    it('can be constructed', () => {
        const w = new World(42, 42);

        expect(w).not.to.equal(undefined);
    });

    it('can process a shot in all directions', () => {
        const w = new World(9, 9);

        w.addNPC(0, 4);
        w.addNPC(4, 0);
        w.addNPC(4, 8);
        w.addNPC(8, 4);
        const unitID = w.addUnit(4, 4);

        expect(w.processShot(unitID, 1, 0)).to.equal(true);
        expect(w.processShot(unitID, -1, 0)).to.equal(true);
        expect(w.processShot(unitID, 0, 1)).to.equal(true);
        expect(w.processShot(unitID, 0, -1)).to.equal(true);
    });
});
