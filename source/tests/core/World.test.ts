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
        w.addNPC(4, 5);
        w.addNPC(8, 4);
        const unitID = w.addUnit(4, 4);

        expect(w.processShot(unitID, 1, 0)).to.equal(true);
        expect(w.processShot(unitID, -1, 0)).to.equal(true);
        expect(w.processShot(unitID, 0, 1)).to.equal(true);
        expect(w.processShot(unitID, 0, -1)).to.equal(true);

        const npc = w.addNPC(7, 4);

        expect(w.processShot(npc, -1, 0)).to.equal(true);
    });

    it('returns false, if no hit should happen', () => {
        const w = new World(9, 9);
        const unitID = w.addUnit(4, 4);

        expect(w.processShot(unitID, 1, 0)).to.equal(false);
        expect(w.processShot(unitID, -1, 0)).to.equal(false);
        expect(w.processShot(unitID, 0, 1)).to.equal(false);
        expect(w.processShot(unitID, 0, -1)).to.equal(false);

        w.addUnit(6, 4);
        w.addNPC(8, 4);

        expect(w.processShot(unitID, 1, 0)).to.equal(false);
        expect(w.processShot(unitID, 0, 0)).to.equal(false);
        expect(w.processShot(unitID, -1, -1)).to.equal(false);
        expect(w.processShot(unitID, -1, 1)).to.equal(false);
        expect(w.processShot(unitID, 1, -1)).to.equal(false);
        expect(w.processShot(unitID, 1, 1)).to.equal(false);
    });

    it('returns the right amount of units left', () => {
        const w = new World(9, 9);

        const unit1 = w.addUnit(1, 1);
        const unit2 = w.addUnit(2, 2);
        const npc = w.addNPC(3, 3);

        expect(w.unitsLeft()).to.equal(2);
        w.removeObject(unit1);
        expect(w.unitsLeft()).to.equal(1);
        w.removeObject(npc);
        expect(w.unitsLeft()).to.equal(1);
        w.removeObject(unit2);
        expect(w.unitsLeft()).to.equal(0);
    });

    it('returns the right size', () => {
        const w = new World(42, 1337);

        expect(w.getSize()[0]).to.equal(42);
        expect(w.getSize()[1]).to.equal(1337);
    });
});
