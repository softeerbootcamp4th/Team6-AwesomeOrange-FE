import { useMemo } from "react";
import useAuthStore from "@/auth/store.js";
import CommentSubmitButtonContent from "./CommentSubmitButton.jsx";
import Button from "@/common/Button.jsx";
import {fetchResource} from "@/common/fetchServer.js";
import Suspense from "@/common/Suspense.jsx";
import ErrorBoundary from "@/common/Suspense.jsx";

function CommentSubmitButton()
{
	const isLogin = useAuthStore();
	const resource = useMemo( ()=>fetchResource("/api/v1/comment/info", isLogin), [isLogin] );

	return <ErrorBoundary fallback={<Button styleType="filled" disabled>에러</Button>}>
		<Suspense fallback={<Button styleType="filled" disabled>...</Button>}>
			<CommentSubmitButtonContent resource={resource} />
		</Suspense>
	</ErrorBoundary>
}


export default CommentSubmitButton;