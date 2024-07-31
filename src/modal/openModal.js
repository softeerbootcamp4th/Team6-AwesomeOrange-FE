import { modalStore } from "./store.js"

export default function openModal(component, layer="alert")
{
	modalStore.changeModal(component, layer);
}