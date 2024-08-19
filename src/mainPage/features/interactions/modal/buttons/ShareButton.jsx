import { fetchServer } from "@common/dataFetch/fetchServer.js";
import Button from "@common/components/Button.jsx";

function ShareButton({url, openToast, disabled})
{
	function onClickShare() {
		fetchServer(
			`/api/v1/url/shorten?originalUrl=${encodeURIComponent(url)}`,
			{
				method: "POST",
			},
		)
		.then(({ shortUrl }) => {
			navigator.clipboard.writeText(`http://softeerorange.store/api/v1/url/${shortUrl}`);
		})
		.catch(() => {
			navigator.clipboard.writeText(url);
		})
		.finally( openToast );
	}

	return <Button
		disabled={disabled}
		onClick={onClickShare}
		styleType="ghost"
		backdrop="dark"
		className="text-body-m px-4 sm:px-10 py-4"
	>
		공유하기
	</Button>
}

export default ShareButton;