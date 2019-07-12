export class GlobalEventDistributor {
    constructor() {
        this.stores = {};
    }
    registerStore({module,store}) {
        this.stores[module]=store;
    }
    dispatch(event) {
        
    }
    getState() {
        
    }
}