import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  types: [],
  activeType: 0,
  sizes: [],
  activeSize: 0,
};

export const filterSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    changeCategory(state, action) {
      state.categoryId = action.payload;
    },

    changeSort(state, action) {
      state.sortId = action.payload;
    },

    changeSearchValue(state, action) {
      state.searchValue = action.payload;
    },

    setPage(state, action) {
      state.currentPage = action.payload;
    },

    setFilter(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.sortId = Number(action.payload.sortId);
      state.currentPage = Number(action.payload.page);
    },
  },
});

export const selectFilter = (store) => store.filter;

export const { changeCategory, changeSort, changeSearchValue, setPage, setFilter } =
  filterSlice.actions;
export default filterSlice.reducer;
