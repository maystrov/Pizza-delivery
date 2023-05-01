import React from "react";
import "./Pagination.scss";
import ReactPaginate from "react-paginate";
import { selectFilter, setPage } from "../../store/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Pagination() {
  const { currentPage } = useSelector(selectFilter);
  const dispatch = useDispatch();
  const handlePageChange = (page) => {
    console.log(page);
    dispatch(setPage(page.selected + 1));
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageChange}
      // pageRangeDisplayed={1}
      pageCount={2}
      previousLabel="<"
      renderOnZeroPageCount={null}
      containerClassName="root"
    />
  );
}
