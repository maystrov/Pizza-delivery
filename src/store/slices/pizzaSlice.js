import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk("pizza/fetchPizzasStatus", async (params) => {
  const { sortItems, sortId, baseUrl, search, category, page } = params;
  const responce = await axios.get(
    `${baseUrl}?limit=8&page=${page}${category}&sortby=${sortItems[sortId]}${search}`
  );
  return responce.data;
});

const initialState = {
  items: [],
  status: "loading",
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.items = action.payload;
      console.log(state.items);
    },
  },

  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const selectPizzaData = (store) => store.pizza;

export const { setPizzas } = pizzaSlice.actions;
export default pizzaSlice.reducer;
