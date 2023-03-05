import { createSlice } from '@reduxjs/toolkit'
interface InitialState {
  time: number
}

const initialState: InitialState = {
  time: 0,
}

export const timeSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    incTime: (state) => {
      state.time += 1
    },
    stop: () => initialState,
  },
})

export const timeActions = timeSlice.actions

export default timeSlice.reducer
