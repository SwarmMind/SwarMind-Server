import * as assert from 'assert';
import FactoryStore from './FactoryStore';
import MapObject from './MapObject';
import NPCObject from './NPCObject';
import State from './State';
import UnitObject from './UnitObject';

export default class World {

    private sizeX: number;
    private sizeY: number;
    public store: FactoryStore;
    // TODO: make private
    public fieldContents: Array<Array<MapObject>>;

    constructor(sizeX, sizeY) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;

        this.store = new FactoryStore();

        this.initFieldContents();
    }

    private initFieldContents() {
        this.fieldContents = [];

        for (let i = 0; i < this.sizeX; i++) {
            this.fieldContents.push([]);
            for (let k = 0; k < this.sizeY; k++) {
                this.fieldContents[i].push(null);
            }
        }
    }

    private moveMapObjectBy(mapObject: MapObject, dX: number, dY: number) {
        this.fieldContents[mapObject.getPosX()][mapObject.getPosY()] = null;
        mapObject.moveBy(dX, dY);   
        
        // now the position of mapObject changed and must be accessed new
        this.fieldContents[mapObject.getPosX()][mapObject.getPosY()] = mapObject;
    }

    /**
     * moveUnitBy
     */
    public moveUnitIfPossible(ID: string, dX: number, dY: number): boolean {
        const unit = this.store.getObjectByID(ID);

        if (!this.isMovePossible(ID, dX, dY)) {
            return false;
        }

        this.moveMapObjectBy(unit, dX, dY);

        return true;
    }

    public isMovePossible(ID: string, dX: number, dY: number): boolean {
        const unit = this.store.getObjectByID(ID);
        const newX = unit.getPosX() + dX;
        const newY = unit.getPosY() + dY;

        if (newX < 0 || newX >= this.sizeX) { return false; }
        if (newY < 0 || newY >= this.sizeY) { return false; }

        if (this.fieldContents[newX][newY] !== null) { return false; }

        return true;
    }

    /**
     * Processes a shot-command of a unit with given direction
     * @param unitID ID of the unit that shoots
     * @param directionX Direction on x-Axis (will be checked for <0, 0, >0)
     * @param directionY Direction on y-Axis (will be checked for <0, 0, >0)
     */
    public processShot(unitID: string, directionX: number, directionY: number) {
        console.log('trying to process a shot by unit #' + unitID + ' into direction x:' + directionX + ', y:' + directionY);

        // In this prototype always one of the directions will be 0 and the other one <>0
        // But later on this implementation can be used for diagonal shots
        if (directionX === 0 && directionY === 0) { return false; }
        if (directionX !== 0 && directionY !== 0) { return false; }

        const unit = this.store.getObjectByID(unitID);
        const hitObject = this.scanForFirstHit(unit.getPosX(), unit.getPosY(), directionX, directionY);
       
        // This could maybe done in a better way with type assertions
        if (hitObject !== null) {
            console.log('found an object in shooting direction: #' + hitObject.getID());
            if (
                unit.isUnit() && hitObject.isNPC() ||
                unit.isNPC() && hitObject.isUnit()
            ) {
                console.log('trying to remove hitten NPC');
                this.removeObject(hitObject.getID());
                return true;
            }
        }

        return false;
    }

    private coordiantesAreInField(x, y){
        return x >= 0 && y >= 0 && x < this.sizeX && y < this.sizeY;
    }

    /**
     * addUnit
     */
    public addUnit(x: number, y: number) {
        assert(this.coordiantesAreInField(x, y));
        const unit = this.store.createUnit(x, y);
        this.fieldContents[x][y] = unit;

        return unit.getID();
    }

    /**
     * addNPC
     */
    public addNPC(x: number, y: number) {
        assert(this.coordiantesAreInField(x, y));
        const npc = this.store.createNPC(x, y);
        this.fieldContents[x][y] = npc;

        return npc.getID();
    }

    /**
     * removeObject
     */
    public removeObject(ID: string) {
        const unit = this.store.getObjectByID(ID);
        this.store.removeObject(ID);
        this.fieldContents[unit.getPosX()][unit.getPosY()] = null;
    }

    /**
     * getState
     */
    public getState(roundID: number): State {
        const state = new State(roundID);

        for (const obj of this.store) {
            state.addMapObject(obj);
        }

        return state;
    }

    public getSize(): {x: number, y: number}{
        return {x: this.sizeX, y: this.sizeY};
    }

    public doNPCActions() {
        const npcs = this.store.getNPCs();
        const units = this.store.getUnits();

        npcs.forEach((npc) => {
            let minDist = this.sizeX + this.sizeY;
            let candidate = null;

            for (let i = 0; i < units.length; i++) {
                const unit = units[i];
                const dist = unit.getDistance(npc.getPosX(), npc.getPosY());
                if (dist < minDist) {
                    minDist = dist;
                    candidate = unit;
                }
            }

            if (candidate !== null) {
                const dist = candidate.getDistance(npc.getPosX(), npc.getPosY());
                const distX = candidate.getPosX() - npc.getPosX();
                const distY = candidate.getPosY() - npc.getPosY();

                if (dist <= 1 && (npc.getPosX() !== candidate.getPosX() || npc.getPosY() !== candidate.getPosY())) {
                    // Kill the unit
                    units.splice(units.indexOf(candidate), 1);
                    this.removeObject(candidate.getID());
                } else {
                    let dX = 0;
                    let dY = 0;

                    // Pretty quick and dirty...
                    if (Math.abs(distX) > Math.abs(distY)) {
                        if (distX > 0) {
                            dX = 1;
                        } else {
                            dX = -1;
                        }
                    }
                    else if (Math.abs(distX) < Math.abs(distY)) {
                        if (distY > 0) {
                            dY = 1;
                        } else {
                            dY = -1;
                        }
                    }
                    else {
                        const rand = Math.floor((Math.random()) * 2 + 1);

                        if (rand === 1) {
                            if (distX > 0) {
                                dX = 1;
                            } else {
                                dX = -1;
                            }
                        } else {
                            if (distY > 0) {
                                dY = 1;
                            } else {
                                dY = -1;
                            }
                        }
                    }
                    this.moveMapObjectBy(npc, dX, dY);
                }
            }
        });
    }

    public unitsLeft(): number {
        const units = this.store.getUnits();
        return units.length;
    }

    private scanForFirstHit(posX: number, posY: number, directionX: number, directionY: number) {
        if (directionX > 0) { posX++; }
        if (directionX < 0) { posX--; }
        if (directionY > 0) { posY++; }
        if (directionY < 0) { posY--; }
        
        while (this.coordiantesAreInField(posX, posY)) {
            if (this.fieldContents[posX][posY] !== null) {
                return this.fieldContents[posX][posY];
            }
            
            if (directionX > 0) { posX++; }
            if (directionX < 0) { posX--; }
            if (directionY > 0) { posY++; }
            if (directionY < 0) { posY--; }
        }

        return null;
    }
}
