// **매일매일 공개되는** 더 뉴 아이오닉과 관련된 **인터랙션을 수행한다.**
// **...**로 감싸진 것은 강조입니다.

function makeHighlight(plainText, highlightClass)
{
	const tokened = plainText.split(/\*\*(.*?)\*\*/mg);

	return tokened.map((content, index) => {
		if(index % 2 === 0) return content;
		return <span
			key={content + index}
			className={highlightClass}
		>
			{content}
		</span>
	});
}

export default makeHighlight;