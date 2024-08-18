function EventDrawPolicyItem({action, score})
{
	return <>
		<p className="justify-self-start">{action}</p>
		<p>{score}</p>
	</>
}

export default EventDrawPolicyItem;