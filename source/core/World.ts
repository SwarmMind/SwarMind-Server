import FactoryStore from './FactoryStore';
import State from './State';
import MapObject from './MapObject';

export default class World {

    private sizeX: number;
    private sizeY: number;
    private store: FactoryStore;
    private fieldContents: MapObject[][];

    /**
     * removeUnitBy
     */
    public removeUnitBy(ID: number, dX: number, dY: number) {}

    /**
     * addUnit
     */
    public addUnit(x: number, y: number) {}

    /**
     * addNPC
     */
    public addNPC(x: number, y: number) {}

    /**
     * removeObject
     */
    public removeObject(ID: number) {}

    /**
     * getState
     */
    public getState(): State {
        return new State;
    }

}