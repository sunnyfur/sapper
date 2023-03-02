import { useEffect, useState } from 'react'
import { EnumCell } from '../../types/enums'
import { TypeCell } from '../../types/types'
import Cell from '../cell/Cell'
import styles from './field.module.scss'

const arrValues: TypeCell[] = Array(16 * 16)
  .fill(0)
  .map((elem, index) => ({
    type: EnumCell.common,
    isMine: false,
    id: index,
  }))

const Field = () => {
  const [allCells, setAllCells] = useState<TypeCell[]>([] as TypeCell[])
  useEffect(() => {
    setAllCells(arrValues)
  }, [])
  const handleClick = (id: number) => {
    const prev = JSON.parse(JSON.stringify(allCells))
    prev[id].type = EnumCell.pressed
    setAllCells(prev)
  }

  return (
    <div className={styles.field}>
      {allCells &&
        allCells.map((cell) => <Cell key={cell.id} typeCell={cell} onClick={handleClick} />)}
    </div>
  )
}
export default Field
