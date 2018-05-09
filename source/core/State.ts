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
    public serialize(): string {
        const state = {
            roundID: this.roundID,
            mapObjects: this.mapObjects.map((mapObject) => mapObject.serialize()),
        };

        return JSON.stringify(state);       // stringify in COM?
    }
}
