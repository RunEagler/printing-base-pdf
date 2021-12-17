import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Setting } from '@/models/Setting';

export interface SettingState {
  settings: Setting[];
  titles: string[];
}

const initialState: SettingState = {
  settings: [],
  titles: [],
};

export const settingPersistModule = createSlice({
  name: 'settingPersistModule',
  initialState,
  reducers: {
    setSettings: (state: SettingState, action: PayloadAction<Setting[]>) => {
      state.settings = action.payload;
    },
    setTitles: (state: SettingState, action: PayloadAction<string[]>) => {
      state.titles = action.payload;
    },
  },
  extraReducers: {},
});
