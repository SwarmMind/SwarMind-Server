import MapObject from './MapObject';

export default class State {
    private mapObjects: MapObject[];

    constructor() {}

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
            mapObjects: this.mapObjects.map(mapObject => mapObject.serialize()),
        };

        return JSON.stringify(state);       // stringify in COM
    }
}
