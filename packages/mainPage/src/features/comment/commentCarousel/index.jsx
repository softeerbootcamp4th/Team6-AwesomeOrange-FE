import Suspense from "@common/components/Suspense.jsx";
import ErrorBoundary from "@common/components/ErrorBoundary.jsx";
import CommentCarousel from "./CommentCarousel.jsx";
import CommentCarouselSkeleton from "./CommentCarouselSkeleton.jsx";
import CommentCarouselError from "./CommentCarouselError.jsx";

function CommentCarouselView() {
  return (
    <ErrorBoundary fallback={<CommentCarouselError />}>
      <Suspense fallback={<CommentCarouselSkeleton />}>
        <CommentCarousel />
      </Suspense>
    </ErrorBoundary>
  );
}

export default CommentCarouselView;
