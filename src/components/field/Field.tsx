import { useCallback, useEffect, useState } from 'react'
import { ScriptElementKindModifier } from 'typescript'
import { FIELDH, FIELDW, MINESCOUNT } from '../../types/cont'
import { EnumCell } from '../../types/enums'
import { TypeCell } from '../../types/types'
import { genereteMines, mineCells } from '../../utils/utils'
import Cell from '../cell/Cell'
import styles from './field.module.scss'

const arrValues: TypeCell[] = Array(FIELDW * FIELDH)
  .fill(0)
  .map((elem, index) => ({
    type: EnumCell.common,
    isMine: false,
    id: index,
  }))
genereteMines().map((posit) => (arrValues[posit].isMine = true))

const Field = () => {
  const [allCells, setAllCells] = useState<TypeCell[]>([] as TypeCell[])
  const [isGame, setIsGame] = useState<boolean>()
  useEffect(() => {
    setAllCells(arrValues)
    setIsGame(true)
  }, [])

  const handleRightButton = (id: number) => {
    if (!isGame) return
    const prev: TypeCell[] = [...allCells]
    if (prev[id].type == EnumCell.flag) {
      prev[id].type = EnumCell.question
    } else if (prev[id].type == EnumCell.common) {
      prev[id].type = EnumCell.flag
    } else prev[id].type = EnumCell.common
    setAllCells(prev)
  }
  const handleClick = (id: number) => {
    if (!isGame) return
    // const prev: TypeCell[] = JSON.parse(JSON.stringify(allCells)) as TypeCell[]
    const prev: TypeCell[] = [...allCells]

    if (prev[id].type != EnumCell.flag && prev[id].type != EnumCell.question) {
      if (prev[id].isMine) {
        setIsGame(false)
        prev[id].type = EnumCell.error
        prev.forEach((cell) => {
          if (cell.id != id && cell.isMine && cell.type != EnumCell.flag) cell.type = EnumCell.mine
        })
      } else mineCells(prev, id)
    }

    setAllCells(prev)
  }
  return (
    <div className={styles.field}>
      {allCells &&
        allCells.map((cell) => (
          <Cell
            key={cell.id}
            typeCell={cell}
            onClick={handleClick}
            onContextMenu={handleRightButton}
          />
        ))}
    </div>
  )
}
export default Field
