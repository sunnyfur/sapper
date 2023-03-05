import { EnumCell } from './../types/enums'
import { FIELDH, FIELDW, MINESCOUNT } from '../types/const'
import { TypeCell } from '../types/types'

export const generateEmpty = () => {
  return Array(FIELDW * FIELDH)
    .fill(0)
    .map((elem, index) => ({
      type: EnumCell.common,
      isMine: false,
      id: index,
      isOpened: false,
    }))
}

export const genereteMines = (first: number, numberMines = MINESCOUNT) => {
  const maxArrVal = FIELDW * FIELDH
  const minValue = 0
  const randArr: number[] = []
  do {
    const rand = Math.floor(minValue + Math.random() * (maxArrVal - minValue))
    if (!randArr.includes(rand) && rand != first) randArr.push(rand)
  } while (randArr.length < numberMines)

  return randArr
}

export const mineCells = (arr: TypeCell[], id: number) => {
  if (!arr[id].isMine) {
    const indexes = getIndeces(arr, id)
    const filt = arr.filter((cell) => indexes.includes(cell.id) && cell.isMine).length
    if (filt) {
      arr[id].type = filt
      arr[id].isOpened = true
    } else {
      arr[id].type = EnumCell.pressed
      arr[id].isOpened = true
      indexes.forEach((index) => {
        if (arr[index].type != EnumCell.flag) mineCells(arr, index)
      })
    }
  } else {
    arr[id].type = EnumCell.error
    arr[id].isOpened = true
  }
}

export const showMines = (arr: TypeCell[]) => {
  const filеMines = arr.filter((cells) => cells.isMine && !cells.isOpened)
  filеMines.forEach((cell) => (arr[cell.id].type = EnumCell.mine))
  const filеNotMines = arr.filter((cells) => !cells.isMine && cells.type == EnumCell.flag)
  filеNotMines.forEach((cell) => (arr[cell.id].type = EnumCell.notMine))
}

export const getIndeces = (mainArr: TypeCell[], currIndex: number) => {
  const col = Math.floor(currIndex % FIELDH)
  const row = Math.floor(currIndex / FIELDW)
  const arr: number[] = []
  let index
  const isAvailable = (index: number) =>
    [EnumCell.common, EnumCell.flag, EnumCell.question].includes(mainArr[index].type)
  if (row - 1 >= 0) {
    if (col - 1 >= 0) {
      index = (row - 1) * FIELDW + (col - 1)
      if (isAvailable(index)) arr.push(index)
    }
    index = (row - 1) * FIELDW + col
    if (isAvailable(index)) arr.push(index)
    if (col + 1 < FIELDW) {
      index = (row - 1) * FIELDW + col + 1
      if (isAvailable(index)) arr.push(index)
    }
  }
  if (col - 1 >= 0) {
    index = row * FIELDW + (col - 1)
    if (isAvailable(index)) arr.push(index)
  }

  if (col + 1 < FIELDW) {
    index = row * FIELDW + col + 1
    if (isAvailable(index)) arr.push(index)
  }
  if (row + 1 < FIELDH) {
    if (col - 1 >= 0) {
      index = (row + 1) * FIELDW + (col - 1)
      if (isAvailable(index)) arr.push(index)
    }
    index = (row + 1) * FIELDW + col
    if (isAvailable(index)) arr.push(index)

    if (col + 1 < FIELDW) {
      index = (row + 1) * FIELDW + col + 1
      if (isAvailable(index)) arr.push(index)
    }
  }

  return arr
}
