function getDefaultFcfsArray(startTime, endTime, config = {start: 0, end: 1435, participantCount: 100})
{
	if(startTime === null || endTime === null) return [];

	const MINUTES = 60 * 1000;
	const ONE_DAY = 24 * 60 * MINUTES;

	const TIME_ZONE_OFFSET = new Date().getTimezoneOffset() * MINUTES;
	const startDate = Math.floor((startTime.valueOf() - TIME_ZONE_OFFSET) / ONE_DAY);
	const endDate = Math.floor((endTime.valueOf() - TIME_ZONE_OFFSET) / ONE_DAY);

	const length = endDate - startDate + 1;
	const trueStartDate = startDate * ONE_DAY + TIME_ZONE_OFFSET;

	return Array.from({length}, (_, i)=>{
		const startTime = new Date(Math.max(trueStartDate + i * ONE_DAY + config.start * MINUTES, startTime.valueOf()));
		const endTime = new Date(Math.min(trueStartDate + i * ONE_DAY + config.end * MINUTES, endTime.valueOf()));

		return [
			`auto_made_${i}`,
			{startTime, endTime, participantCount: config.participantCount, prizeInfo: ""}
		];
	}
}

function makeUUID()
{
	const rawStr = Array.from({length:32}, ()=>randInt(16).toString(16) ).join('');
	const checksum = (randInt(4)+8).toString(16);

	return `${rawStr.slice(0,8)}-${rawStr.slice(8,12)}-4${rawStr.slice(13,16)}-${checksum}${rawStr.slice(17,20)}-${rawStr.slice(20)}`;
}

class FcfsData
{
	constructor(rawData)
	{
		if(Array.isArray(rawData)) {
			const mapArr = rawData.map( ({id, startTime, endTime, ...rest})=>{
				return [`determined_${id}`, {
					id,
					startTime: new Date(startTime),
					endTime: new Date(endTime)
					...rest
				}];
			} );

			this.map = new Map( mapArr );
		}
		else if(rawData instanceof Map) this.map = new Map(rawData);
		else this.map = new Map();
	}
	static fillDefault(startTime, endTime, config)
	{
		const mapArr = getDefaultFcfsArray(startTime, endTime, config);
		return new FcfsData( new Map( mapArr ) );
	}
	add(data)
	{
		const newData = new FcfsData( this.map );
		newData.map.set(`user_created_${makeUUID()}`, data);
		return newData;
	}
	delete(key)
	{
		const newData = new FcfsData( this.map );
		newData.map.delete(key);
		return newData;
	}
	modify(key, data={})
	{
		const newData = new FcfsData( this.map );
		const oldItem = newData.map.get(key);
		newData.map.set(key, {...oldItem, ...data});
		return newData;
	}
	modifyAll(data)
	{
		const newData = new FcfsData( this.map );
		for(let [key, item] of this.map)
		{
			newData.map.set(key, {...item, ...data});
		}
		return newData;
	}
	verifyDate(startTime, endTime)
	{
		const newData = new FcfsData( this.map );
		for(let [key, item] of this.map)
		{
			if(item.startTime > endTime || item.endTime < startTime) newData.map.delete(key);
			if(startTime <= item.startTime && item.endTime <= endTime) continue;

			const copied = {...item};
			if(item.endTime > endTime) copied.endTime = endTime;
			if(item.startTime < startTime) copied.startTime = startTime;
			newData.map.set(key, copied);
		}
		return newData;
	}
	*[Symbol.iterator]()
	{
		for( let [key, item] of this.map )
		{
			yield {key, ...item};
		}
	}
	toJSON() {
		return [...this.map.values()];
	}
}

export default FcfsData;