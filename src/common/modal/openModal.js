import { modalStore } from "./store.js";

export default function openModal(component, layer = "alert") {
  modalStore.changeModal(component, layer); 
  return new Promise( (resolve)=>{
    function observe()
    {
      if(modalStore.getSnapshot(layer) !== component) {
        resolve();
        clear();
      }
    }
    const clear = modalStore.subscribe( observe );
  } );
}
