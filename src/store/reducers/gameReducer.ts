import { MINESCOUNT } from './../../types/const'
import { SmileStatus } from './../../types/enums'
import { TypeCell } from './../../types/types'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

export const cellsAdapter = createEntityAdapter<TypeCell>({
  selectId: (cell) => cell.id,
})
export const cellsSelector = cellsAdapter.getSelectors()
export const cellsAll = cellsSelector.selectAll

export const gameSlice = createSlice({
  name: 'game',
  initialState: cellsAdapter.getInitialState({
    isGame: false,
    time: 0,
    minesCount: MINESCOUNT,
    smileStatus: SmileStatus.common,
  }),
  reducers: {
    newGame: (state) => {
      state.isGame = true
      state.time = 0
      state.minesCount = MINESCOUNT
      state.smileStatus = SmileStatus.common
    },

    incMines: (state) => {
      state.minesCount += 1
    },
    decMines: (state) => {
      state.minesCount -= 1
    },
    incTime: (state) => {
      state.time += 1
    },
    setSmileStaus: (state, action) => {
      state.smileStatus = action.payload
    },

    startGame: (state) => {
      state.isGame = true
    },
    stopGame: (state) => {
      state.isGame = false
    },
    setCells: cellsAdapter.setAll,
    updateCell: (state, action) => {
      cellsAdapter.updateOne(state, action.payload)
    },

    updateCells: cellsAdapter.updateMany,
  },
})

export const gameActions = gameSlice.actions

export default gameSlice.reducer
