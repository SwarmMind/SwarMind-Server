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
        const serializedObjects = [];
        this.mapObjects.forEach((mapObject) => {
            serializedObjects.push(mapObject.serialize());
        });
        // same as: this.mapObjects.map(mapObject => mapObject.serialize())

        const state = {
            mapObjects: serializedObjects,
        };

        return JSON.stringify(state);
    }
}
