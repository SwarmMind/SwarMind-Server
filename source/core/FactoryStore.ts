import * as assert from 'assert';
import MapObject from './MapObject';
import NPCObject from './NPCObject';
import UnitObject from './UnitObject';

export default class FactoryStore implements Iterable<MapObject> {
    private mapObjects: MapObject[] = [];

    private unitCounter: number;
    private npcCounter: number;

    private pointer = 0;

    /**
     * getObjectByID
     */
    public getObjectByID(ID: string): MapObject {
        for (const mapObject of this.mapObjects) {
            if (mapObject.getID() === ID) {
                return mapObject;
            }
        }
        return null;
    }

    /**
     * createNPC
     */
    public createNPC(positionX: number, positionY: number): NPCObject {
        const npc = new UnitObject(`npc${this.npcCounter}`, positionX, positionY);
        this.npcCounter++;
        this.mapObjects.push(npc);
        return npc;
    }

    /**
     * createUnit
     */
    public createUnit(positionX: number, positionY: number): UnitObject {
        const unit = new UnitObject(`unit${this.unitCounter}`, positionX, positionY);
        this.unitCounter++;
        this.mapObjects.push(unit);
        return unit;
    }

    /**
     * removeObject
     */
    public removeObject(ID: string) {       // quick and dirty
        const index = this.mapObjects.indexOf(this.getObjectByID(ID));
        assert(index >= 0);     // an object with this ID is in the store
        if (index >= 0) {
            this.mapObjects.splice(index, 1);
        }
    }

    *[Symbol.iterator]() {
        // For what is the * symbol?
        for (const mapObject of this.mapObjects) {
            yield mapObject;
        }
    }


}
