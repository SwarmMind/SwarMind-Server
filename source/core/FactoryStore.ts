import * as assert from 'assert';
import MapObject from './MapObject';
import NPCObject from './NPCObject';
import UnitObject from './UnitObject';

export default class FactoryStore implements Iterable<MapObject> {
    private mapObjects: MapObject[] = [];

    private unitCounter: number;
    private npcCounter: number;

    constructor() {
        this.unitCounter = 0;
        this.npcCounter = 0;
    }

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
        const npc = new NPCObject(`npc${this.npcCounter}`, positionX, positionY);
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
        console.log(this.getObjectByID(ID));
        const index = this.mapObjects.indexOf(this.getObjectByID(ID));
        console.log(index);
        assert(index >= 0);     // an object with this ID is in the store
        if (index >= 0) {
            this.mapObjects.splice(index, 1);
        }
    }

    public getUnits(): Array<UnitObject> {
        const units: Array<UnitObject> = [];

        this.mapObjects.forEach((object) => {
            if (object instanceof UnitObject) { units.push(object); }
        });

        return units;
    }

    public getNPCs(): Array<NPCObject> {
        const units: Array<NPCObject> = [];

        this.mapObjects.forEach((object) => {
            if (object instanceof NPCObject) { units.push(object); }
        });

        return units;
    }

    *[Symbol.iterator]() {
        for (const mapObject of this.mapObjects) {
            yield mapObject;
        }
    }


}
