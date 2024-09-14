import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // allEmployees: [],
  allCategories: [],
};

const commonSlice = createSlice({
  name: 'commonSlice',
  initialState,
  //   reducer needs a map
  reducers: {
    setAllCategories(state, action) {
      state.allCategories = action.payload;
      // state.allCompanies = action.payload?.allCompanies;
    },
  },
});

export const { setAllCategories } = commonSlice.actions;

export default commonSlice.reducer;
