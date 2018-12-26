import PoemsStore from './container/PoemsStore';

export default class Stores {
    private _poems = new PoemsStore();

    get poems() {
        return this._poems;
    }
}

export interface IStores extends Stores {}
