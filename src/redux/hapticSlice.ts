import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { defaultHapticSettings, type HapticSettings } from '../HapticSettingsContext'

const slice = createSlice({
  name: 'haptic',
  initialState: defaultHapticSettings,
  reducers: {
    initialize: (_state, action: PayloadAction<HapticSettings>) => action.payload,
    setVibrate: (state, action: PayloadAction<boolean>) => ({ ...state, vibrate: action.payload })
  }
})

export const hapticActions = slice.actions
export const hapticReducer = slice.reducer
