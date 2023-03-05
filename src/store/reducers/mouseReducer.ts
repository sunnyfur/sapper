import { createSlice } from '@reduxjs/toolkit'
interface InitialState {
  isPressed: boolean
}

const initialState: InitialState = {
  isPressed: false,
}

export const mouseSlice = createSlice({
  name: 'mouse',
  initialState,
  reducers: {
    setIsPressed: (state, action) => {
      state.isPressed = action.payload
    },
  },
})

export const mouseActions = mouseSlice.actions

export default mouseSlice.reducer
