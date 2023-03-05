import { timeActions } from './../reducers/timeReducer'
import { cellsAll, cellsSelector } from './../reducers/gameReducer'
import { generateEmpty, genereteMines, showMines } from './../../utils/utils'
import { EnumCell, SmileStatus } from './../../types/enums'
import { gameActions } from '../reducers/gameReducer'
import { AppDispatch, AppThunk, RootState } from './../store'
import { getIndeces, mineCells } from '../../utils/utils'
import { TypeCell } from '../../types/types'
import { MAXTIME } from '../../types/const'

export const setRightClick =
  (id: number): AppThunk =>
  (dispatch, GetRootState) => {
    const cells = cellsAll(GetRootState().game)

    if (![EnumCell.flag, EnumCell.common, EnumCell.question].includes(cells[id].type)) return
    if (cells[id].type == EnumCell.flag) {
      dispatch(
        gameActions.updateCell({ id: id, changes: { type: EnumCell.question, isOpened: true } }),
      )
      dispatch(gameActions.incMines())
    } else if (cells[id].type == EnumCell.common) {
      dispatch(gameActions.updateCell({ id: id, changes: { type: EnumCell.flag, isOpened: true } }))

      dispatch(gameActions.decMines())
    } else {
      dispatch(
        gameActions.updateCell({ id: id, changes: { type: EnumCell.common, isOpened: false } }),
      )
    }
  }
let timer: ReturnType<typeof setInterval> | null = null
let timerEnd: ReturnType<typeof setInterval> | null = null

const startTimer = (): AppThunk => (dispatch) => {
  timer = setInterval(() => dispatch(timeActions.incTime()), 1000)
  timerEnd = setTimeout(() => dispatch(isLoose()), 1000 * MAXTIME)
}
const stopTimer = () => {
  if (timer) clearInterval(timer)
  if (timerEnd) clearTimeout(timerEnd)
}

export const cellClick =
  (id: number): AppThunk =>
  (dispatch, GetRootState) => {
    if (
      cellsAll(GetRootState().game).every(
        (cell) => !cell.isOpened || cell.type == EnumCell.flag || cell.type == EnumCell.question,
      )
    ) {
      const mines = genereteMines(id)
      mines.forEach((id) => dispatch(gameActions.updateCell({ id: id, changes: { isMine: true } })))
      dispatch(gameActions.startGame())
      dispatch(startTimer())
    }
    const cellsState = cellsAll(GetRootState().game)
    dispatch(gameActions.setSmileStaus(SmileStatus.common))
    // if (cellsState[id].isOpened) {
    //   return
    // }

    const cells: TypeCell[] = JSON.parse(JSON.stringify(cellsState))

    mineCells(cells, id)
    dispatch(gameActions.setCells(cells))

    if (cellsState[id].isMine) {
      dispatch(gameActions.updateCell({ id: id, changes: { type: EnumCell.error } }))
      dispatch(isLoose())
    }
    dispatch(isWin())
  }

export const newGame = (): AppThunk => (dispatch) => {
  dispatch(gameActions.setCells(generateEmpty()))
  dispatch(gameActions.newGame())
  stopTimer()
  dispatch(timeActions.stop())
}

export const isWin = (): AppThunk => (dispatch, GetRootState) => {
  const cellsState = cellsAll(GetRootState().game)
  if (
    cellsState.every((cell) => cell.isOpened) &&
    !cellsState.find((cell) => cell.type == EnumCell.question)
  ) {
    const find = cellsState.filter((cell) => cell.isMine)
    if (find.every((cell) => cell.type == EnumCell.flag)) {
      dispatch(gameActions.setSmileStaus(SmileStatus.success))
      dispatch(gameActions.stopGame())
      stopTimer()
    }
  }
}
export const isLoose = (): AppThunk => (dispatch, GetRootState) => {
  const cellsState = cellsAll(GetRootState().game)
  const cells: TypeCell[] = JSON.parse(JSON.stringify(cellsState))
  showMines(cells)
  dispatch(gameActions.setCells(cells))
  dispatch(gameActions.setSmileStaus(SmileStatus.sad))
  dispatch(gameActions.stopGame())
  stopTimer()
}
