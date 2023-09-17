import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  URL: "",
  results: [],
  pageScore: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setResults: {
      prepare(data) {
        const arr = Object.entries(data);
        const cleanedObject = arr.map((el) => {
          return { [el[0]]: el[1] };
        });

        return {
          payload: { data: cleanedObject },
        };
      },
      reducer(state, action) {
        state.results = action.payload.data;
        state.pageScore = action.payload.data.find((obj) => {
          const key = Object.keys(obj)[0];
          return key === "onpage_score";
        })["onpage_score"];
      },
    },

    setURL(state, action) {
      state.URL = action.payload;
    },

    setPageScore(state, action) {
      state.pageScore = action.payload;
    },

    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export default uiSlice.reducer;

export const uiActions = uiSlice.actions;
