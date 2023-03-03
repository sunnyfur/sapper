import { EnumCell } from './../types/enums'
import { FIELDH, FIELDW, MINESCOUNT } from '../types/cont'
import { TypeCell } from '../types/types'

export const genereteMines = (numberMines = MINESCOUNT) => {
  const maxArrVal = FIELDW * FIELDH
  const minValue = 0
  const randArr: number[] = []
  do {
    const rand = Math.floor(minValue + Math.random() * (maxArrVal - minValue))
    if (!randArr.includes(rand)) randArr.push(rand)
  } while (randArr.length <= numberMines)
  return randArr
}

export const mineCells = (arr: TypeCell[], id: number) => {
  // const newArr = [...arr]
  if (!arr[id].isMine) {
    const indexes = getIndeces(arr, id)

    const filt = arr.filter((cell) => indexes.includes(cell.id) && cell.isMine).length
    if (filt) arr[id].type = filt
    else {
      arr[id].type = EnumCell.pressed

      indexes.forEach((index) => {
        if (arr[index].type != EnumCell.flag) mineCells(arr, index)
      })
    }
  } else arr[id].type = EnumCell.error
  // return newArr
}

export const getIndeces = (mainArr: TypeCell[], currIndex: number) => {
  const col = Math.floor(currIndex % FIELDH)
  const row = Math.floor(currIndex / FIELDW)
  const arr: number[] = []
  let index
  if (row - 1 >= 0) {
    if (col - 1 >= 0) {
      index = (row - 1) * FIELDW + (col - 1)
      console.log('-1,-1', row - 1, col - 1, index)
      if (mainArr[index].type == EnumCell.common || mainArr[index].type == EnumCell.flag)
        arr.push(index)
    }
    index = (row - 1) * FIELDW + col
    console.log('-1,1', row - 1, col, index)
    if (mainArr[index].type == EnumCell.common || mainArr[index].type == EnumCell.flag)
      arr.push(index)
    if (col + 1 < FIELDW) {
      index = (row - 1) * FIELDW + col + 1
      console.log('-1,+1', row - 1, col + 1, index)
      if (mainArr[index].type == EnumCell.common || mainArr[index].type == EnumCell.flag)
        arr.push(index)
    }
  }
  if (col - 1 >= 0) {
    index = row * FIELDW + (col - 1)
    console.log('1,-1', row, col - 1, index)
    if (mainArr[index].type == EnumCell.common || mainArr[index].type == EnumCell.flag)
      arr.push(index)
  }

  if (col + 1 < FIELDW) {
    index = row * FIELDW + col + 1
    console.log('1,+1', row, col + 1, index)
    if (mainArr[index].type == EnumCell.common || mainArr[index].type == EnumCell.flag)
      arr.push(index)
  }
  if (row + 1 < FIELDH) {
    if (col - 1 >= 0) {
      console.log('+1,-1', row + 1, col - 1, index)
      index = (row + 1) * FIELDW + (col - 1)
      if (mainArr[index].type == EnumCell.common || mainArr[index].type == EnumCell.flag)
        arr.push(index)
    }
    index = (row + 1) * FIELDW + col
    console.log('+1,1', row + 1, col, index)
    if (mainArr[index].type == EnumCell.common || mainArr[index].type == EnumCell.flag)
      arr.push(index)

    if (col + 1 < FIELDW) {
      index = (row + 1) * FIELDW + col + 1
      console.log('+1,+1', row + 1, col + 1, index)
      if (mainArr[index].type == EnumCell.common || mainArr[index].type == EnumCell.flag)
        arr.push(index)
    }
  }

  return arr
}
