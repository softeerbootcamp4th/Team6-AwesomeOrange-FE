import { useSyncExternalStore } from "react";

class ModalStore {
	constructor() {
		this.callback = new Set();
		this.modalChildren = new Map();
	}
	subscribe(callback) {
		this.callback.add( callback );
		return ()=>this.callback.delete( callback );
	}
	changeModal(component, layer) {
		if(this.modalChildren.get(layer) === component) return;
		this.modalChildren.set(layer, component);
		this.#update();
	}
	removeModal(layer) {
		if(this.modalChildren.get(layer) === null) return;
		this.modalChildren.set(layer, null);
		this.#update();
	}
	#update() {
		this.callback.forEach( (update)=>update() );
	}
	getSnapshot(layer) {
		return ()=>{
			return this.modalChildren.get(layer) ?? null;
		}
	}
}

const store = new ModalStore();

function useModalStore(layer) {
	return useSyncExternalStore(store.subscribe.bind(store), store.getSnapshot(layer), ()=>null);
}
function closeModal(layer) {
	store.removeModal(layer);
}

export default useModalStore;

export { store as modalStore, closeModal };