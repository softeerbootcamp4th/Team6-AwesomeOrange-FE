import { create } from "zustand";
import tokenSaver from "./tokenSaver.js";

const userStore = create( (set)=>({
	isLogin: false,
	userName: ""
}) );

function parseTokenToUserName(token)
{
	if(token === null) return "";
	return "사용자";
}

export function login(token)
{
	tokenSaver.set(token);
	const userName = parseTokenToUserName(token);
	userStore.setState( ()=>({isLogin: true, userName}) );
}

export function logout()
{
	tokenSaver.remove();
	userStore.setState( ()=>({isLogin: false, userName: ""}) );
}

export function initLoginState()
{
	tokenSaver.init();
	const token = tokenSaver.get();
	const userName = parseTokenToUserName(token);
	if(token === null) userStore.setState( ()=>({isLogin: false, userName: ""}) );
	else userStore.setState( ()=>({isLogin: true, userName}) );
}

export default userStore;