import { fetchServer } from "@common/dataFetch/fetchServer.js";
import { useMutation } from "@common/dataFetch/getQuery.js";
import Button from "@common/components/Button.jsx";

function DeleteButton({selected})
{
	const mutate = useMutation(
		"admin-event-list",
		()=>fetchServer("/api/v1/admin/events", {
			method: "delete",
			body: {
				eventIds: [...selected]
			}
		}),
		{
			onSuccess: ()=>console.log("success!")
		}
	)

	function onClick()
	{
		mutate();
	}
	return <Button onClick={onClick} disabled={ selected.size === 0 }>삭제</Button>
}

export default DeleteButton;