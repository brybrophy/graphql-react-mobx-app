import PoemsStore from './container/PoemsStore';
import PoemDetailStore from './container/PoemDetailStore';

export default class Stores {
    public poems = new PoemsStore();
    public poemDetail = new PoemDetailStore();
}

export interface IStores extends Stores {}
