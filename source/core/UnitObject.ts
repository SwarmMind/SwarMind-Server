import MapObject from './MapObject';

export default class UnitObject extends MapObject {
    public isUnit(): boolean{
        return true;
    }
}
