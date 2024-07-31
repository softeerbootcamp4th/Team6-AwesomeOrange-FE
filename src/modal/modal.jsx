import { createContext, useCallback, useSyncExternalStore } from "react";
import useModalStore, { closeModal } from "./store.js";

export const ModalCloseContext = createContext( ()=>{ console.log("모달이 닫힙니다."); } );

function Modal({layer})
{
	const child = useModalStore(layer);
	const close = useCallback( ()=>{
		closeModal(layer);
	}, [] );

	return <ModalCloseContext.Provider value={ close }>
		{child}
	</ModalCloseContext.Provider>
}

export default Modal;
