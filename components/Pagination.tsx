import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: any) {
  const pageBtnClass = `
    flex items-center justify-center w-[36px] h-[36px] text-black 
    border border-gray-200 rounded-md bg-white 
    hover:bg-[#f9fafb] hover:border-[#667eea] hover:text-[#667eea]
    active:bg-gradient-to-br active:from-[#667eea] active:to-[#764ba2]
    active:text-white active:border-[#667eea] active:font-semibold
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-colors duration-200
  `;

  const getPageNumbers = () => {
    let page: any[] = [];
    let maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) page.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) page.push(i);
        page.push("...");
        page.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        page.push(1);
        page.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) page.push(i);
      } else {
        page.push(1);
        page.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) page.push(i);
        page.push("...");
        page.push(totalPages);
      }
    }
    return page;
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-6 hidden lg:flex">
        <div>
          Hiển thị {startItem} - {endItem} của {totalItems} kết quả
        </div>
        <div className="flex items-center space-x-1">
          <label htmlFor="row-count" className="text-[#374151] font-semibold">
            Số dòng
          </label>
          <select
            id="row-count"
            className="px-3 py-1 border border-[#e5e7eb] rounded-sm outline-none bg-white hover:border-[#667eea] cursor-pointer"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center lg:justify-end space-x-2">
        <button
          className={pageBtnClass}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft />
        </button>
        <button
          className={pageBtnClass}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </button>

        {getPageNumbers().map((page, i) =>
          page === "..." ? (
            <span key={i} className="text-[#9ca3af] font-semibold">
              ...
            </span>
          ) : (
            <button
              key={i}
              className={`${pageBtnClass} ${
                currentPage === page
                  ? "bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white border-[#667eea] font-semibold"
                  : ""
              }`}
              onClick={() => {
                onPageChange(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {page}
            </button>
          )
        )}

        <button
          className={pageBtnClass}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight />
        </button>
        <button
          className={pageBtnClass}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight />
        </button>
      </div>
    </div>
  );
}
