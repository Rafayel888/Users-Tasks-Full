import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  statusFilter: { name: '' },
  sort: { name: 'By creation date (ASC)', BY_CREATION_DATE: 'ASC' },
  page: 1,
  limit:4,

};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus(state, action) {
      state.statusFilter = action.payload
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.statusFilter = action.payload.order;
    }

  },

});

export const { setStatus, setSearchValue, setSort ,setFilters} = filterSlice.actions;
export default filterSlice.reducer;
