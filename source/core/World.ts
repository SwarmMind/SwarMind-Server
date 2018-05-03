import FactoryStore from './FactoryStore';
import MapObject from './MapObject';
import State from './State';

export default class World {

    private sizeX: number;
    private sizeY: number;
    private store: FactoryStore = new FactoryStore();
    private fieldContents: MapObject[][];

    constructor(sizeX, sizeY){
        this.sizeX = sizeX;
        this.sizeY = sizeY;

        this.initFieldContents();
    }

    private initFieldContents(){
        this.fieldContents = [];

        for(let i = 0; i < this.sizeY; i++){
            this.fieldContents.push([]);
            for(let k = 0; k < this.sizeX; k++){
                this.fieldContents[i].push(null);
            }
        }
    }

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
    public addNPC(x: number, y: number) {
        this.fieldContents[y][x] = this.store.createNPC();
    }

    /**
     * removeObject
     */
    public removeObject(ID: number) {}

    /**
     * getState
     */
    public getState(): State {
        return new State();
    }

}
