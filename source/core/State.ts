import MapObject from './MapObject';
import NPCObject from './NPCObject';

export default class State {
    private units: MapObject[] = [];
    private npcs: MapObject[] = []
    private roundID: number;

    constructor(round: number) {
        this.roundID = round;
    }

    /**
     * addMapObject
     */
    public addMapObject(obj: MapObject) {
        if(obj instanceof NPCObject){
            this.npcs.push(obj);
        }
        else{
            this.units.push(obj)
        }
    }

    /**
     * serialize
     */
    public makeAny(): any {
        const state = {
            roundID: this.roundID,
            units: this.units.map((mapObject) => mapObject.serialize()),
            npcs: this.npcs.map((mapObject) => mapObject.serialize())
        };

        return state;
    }
}
