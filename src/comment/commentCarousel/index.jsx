import Suspense from "@/common/Suspense.jsx";
import ErrorBoundary from "@/common/ErrorBoundary.jsx";
import { fetchResource } from "@/common/fetchServer.js";
import CommentCarousel from "./CommentCarousel.jsx";
import CommentCarouselSkeleton from "./CommentCarouselSkeleton.jsx";
import CommentCarouselError from "./CommentCarouselError.jsx";

function CommentCarouselView() {
  const resource = fetchResource("/api/v1/comment");
  return (
    <ErrorBoundary fallback={<CommentCarouselError />}>
      <Suspense fallback={<CommentCarouselSkeleton />}>
        <CommentCarousel resource={resource} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default CommentCarouselView;
