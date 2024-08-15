function randInt(i)
{
	return Math.floor(Math.random() * i);
}

export default function makeUUID()
{
	const rawStr = Array.from({length:32}, ()=>randInt(16).toString(16) ).join('');
	const checksum = (randInt(4)+8).toString(16);

	return `${rawStr.slice(0,8)}-${rawStr.slice(8,12)}-4${rawStr.slice(13,16)}-${checksum}${rawStr.slice(17,20)}-${rawStr.slice(20)}`;
}