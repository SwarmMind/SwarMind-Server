import MapObject from './MapObject';
import NPCObject from './NPCObject';
import UnitObject from './UnitObject';

// TODO: Implement Iterator
export default class FactoryStore {
    private units: MapObject[];
    private npcs: MapObject[];

    private unitCounter: number;
    private npcCounter: number;

    /**
     * getObjectByID
     */
    public getObjectByID(ID: number) {}

    /**
     * createNPC
     */
    public createNPC(positionX: number, positionY: number): NPCObject {
        let npc = new UnitObject(positionX, positionY, `npc${this.npcCounter}`);
        this.npcCounter++;
        this.npcs.push(npc);
        return npc;
    }

    /**
     * createUnit
     */
    public createUnit(positionX: number, positionY: number): UnitObject {
        let unit = new UnitObject(positionX, positionY, `unit${this.unitCounter}`);
        this.unitCounter++;
        this.units.push(unit);
        return unit;
    }

    /**
     * removeObject
     */
    public removeObject(ID: number) {}

}
