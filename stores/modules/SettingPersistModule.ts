import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Setting } from '@/models/Setting';

export interface DocumentState {
  settings: Setting[];
}

const initialState: DocumentState = {
  settings: [],
};

export const documentPersistModule = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setSettings: (state: DocumentState, action: PayloadAction<Setting[]>) => {
      state.settings = action.payload
    },
  },
  extraReducers: {},
});
