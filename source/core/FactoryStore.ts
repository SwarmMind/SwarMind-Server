import * as assert from 'assert';
import MapObject from './MapObject';
import NPCObject from './NPCObject';
import UnitObject from './UnitObject';

// TODO: Implement Iterator
export default class FactoryStore {
    private mapObjects: MapObject[];

    private unitCounter: number;
    private npcCounter: number;

    /**
     * getObjectByID
     */
    public getObjectByID(ID: string): MapObject {
        for(const mapObject of this.mapObjects){
            if(mapObject.ID == ID){
                return mapObject
            }
        }
        return null;
    }

    /**
     * createNPC
     */
    public createNPC(positionX: number, positionY: number): NPCObject {
        const npc = new UnitObject(positionX, positionY, `npc${this.npcCounter}`);
        this.npcCounter++;
        this.mapObjects.push(npc);
        return npc;
    }

    /**
     * createUnit
     */
    public createUnit(positionX: number, positionY: number): UnitObject {
        const unit = new UnitObject(positionX, positionY, `unit${this.unitCounter}`);
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
        if(index >= 0){
            this.mapObjects.splice(index, 1);
        }
    }

    *[Symbol.iterator]() {
        for (const mapObject of this.mapObjects){
            yield mapObject;
        }
    }

}
