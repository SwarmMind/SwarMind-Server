import MapObject from './MapObject';

export default class NPCObject extends MapObject {
    public isNPC(): boolean{
        return true;
    }
}
