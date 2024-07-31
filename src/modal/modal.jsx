import { createContext, useCallback } from "react";
import useModalStore, { closeModal } from "./store.js";

export const ModalCloseContext = createContext( ()=>{ console.log("모달이 닫힙니다."); } );

function Modal({layer}) {
	const child = useModalStore(layer);
	const close = useCallback( ()=>{
		closeModal(layer);
	}, [layer] );

	return <ModalCloseContext.Provider value={ close }>
		{child !== null ?
			<div className="fixed z-[100] top-0 left-0 w-full h-dvh flex justify-center items-center">
				{child}
				<div 
					className="absolute w-full h-full top-0 left-0 bg-black/60 -z-10"
					onClick={ close }
				>
				</div>
			</div>
			:
			null
		}
	</ModalCloseContext.Provider>
}

export default Modal;
