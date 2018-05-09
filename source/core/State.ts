import MapObject from './MapObject';

export default class State {
    private mapObjects: MapObject[] = [];
    private roundID: number;

    constructor(round: number) {
        this.roundID = round;
    }

    /**
     * addMapObject
     */
    public addMapObject(obj: MapObject) {
        this.mapObjects.push(obj);
    }

    /**
     * serialize
     */
    public makeAny(): any {
        const state = {
            roundID: this.roundID,
            mapObjects: this.mapObjects.map((mapObject) => mapObject.serialize()),
        };

        return state;
    }
}
