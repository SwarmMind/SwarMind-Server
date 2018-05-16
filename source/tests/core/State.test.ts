import { expect } from 'chai';
import MapObject from './../../core/MapObject';
import State from './../../core/State';

describe('User', () => {
    it('gets correctly constructed', () => {
        const state = new State(7);

        expect(state).not.to.equal(undefined);
    });

    it('can take a map object and can construct itself as a js-style-object', () => {
        const state = new State(7);

        const object = new MapObject('1337', 7, 7);
        state.addMapObject(object);
        const anyObject = state.makeAny();

        expect(anyObject).to.eql({
            roundID: 7,
            mapObjects: [{
                ID: object.getID(),
                posX: object.getPosX(),
                posY: object.getPosY(),
            }],
        });
    });
});
