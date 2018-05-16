import { expect } from 'chai';
import MapObject from './../../core/MapObject';
import State from './../../core/State';
import NPCObject from '../../core/NPCObject';
import UnitObject from '../../core/UnitObject';

describe('User', () => {
    it('gets correctly constructed', () => {
        const state = new State(7);

        expect(state).not.to.equal(undefined);
    });

    it('can take a user and npc objects and can construct itself as a js-style-object', () => {
        const state = new State(7);

        const npc = new NPCObject('1337', 7, 7);
        const unit = new UnitObject('1337', 7, 7);
        state.addMapObject(npc);
        state.addMapObject(unit);
        const anyObject = state.makeAny();

        expect(anyObject).to.eql({
            roundID: 7,
            units: [{
                ID: unit.getID(),
                posX: unit.getPosX(),
                posY: unit.getPosY(),
            }],
            npcs: [{
                ID: npc.getID(),
                posX: npc.getPosX(),
                posY: npc.getPosY(),
            }]
        });
    });
});
