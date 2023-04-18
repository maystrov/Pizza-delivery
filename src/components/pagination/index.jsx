import React from "react";
import "./Pagination.scss";
import ReactPaginate from "react-paginate";
import { setPage } from "../../store/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Pagination() {
  const currentPage = useSelector((store) => store.filter.currentPage);
  const dispatch = useDispatch();
  const handlePageChange = (page) => {
    console.log(page);
    dispatch(setPage(page.selected + 1));
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      s
      onPageChange={handlePageChange}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
      containerClassName="root"
    />
  );
}
