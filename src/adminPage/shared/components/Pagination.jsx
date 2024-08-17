import { clamp } from "@common/utils.js";

function getPaginationItem(currentPage, maxPage, length) {
  let prevDelta = length % 2 === 1 ? (length - 1) / 2 : length / 2 - 1;
  let postDelta = length % 2 === 1 ? (length - 1) / 2 : length / 2;

  if (currentPage - prevDelta <= 0) return Array.from({ length }, (_, i) => i + 1);
  if (currentPage + postDelta > maxPage)
    return Array.from({ length }, (_, i) => maxPage - length + i + 1);
  return Array.from({ length }, (_, i) => currentPage - prevDelta + i);
}

function PaginationButton({ onClick, disabled, highlighted, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={`w-8 text-body-l select-none ${highlighted ? "text-blue-400 font-bold" : "text-neutral-700 font-medium hover:text-black"} disabled:text-neutral-300`}
    >
      {children}
    </button>
  );
}

function Pagination({ currentPage, setPage: _setPage, maxPage, length = 5 }) {
  const setPage = (index) => () => _setPage(clamp(index, 1, maxPage));

  return (
    <div className="flex gap-4">
      <PaginationButton onClick={setPage(currentPage - 5)} disabled={currentPage - 2 < 1}>
        &lt;&lt;
      </PaginationButton>
      <PaginationButton onClick={setPage(currentPage - 1)} disabled={currentPage - 1 < 1}>
        &lt;
      </PaginationButton>
      {getPaginationItem(currentPage, maxPage, length).map((i) => (
        <PaginationButton key={i} onClick={setPage(i)} highlighted={i === currentPage}>
          {i}
        </PaginationButton>
      ))}
      <PaginationButton onClick={setPage(currentPage + 1)} disabled={currentPage + 1 > maxPage}>
        &gt;
      </PaginationButton>
      <PaginationButton onClick={setPage(currentPage + 5)} disabled={currentPage + 2 > maxPage}>
        &gt;&gt;
      </PaginationButton>
    </div>
  );
}

export default Pagination;
