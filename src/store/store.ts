import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import gameReducer from './reducers/gameReducer'
import mouseReducer from './reducers/mouseReducer'

export const store = configureStore({ reducer: { game: gameReducer, mouse: mouseReducer } })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type GetRootState = () => RootState
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
