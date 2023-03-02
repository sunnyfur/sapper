import { type } from '@testing-library/user-event/dist/type'
import { useCallback } from 'react'
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
  const handleClick = (id: number) => {
    arrValues[id].type = EnumCell.pressed
  }

  return (
    <div className={styles.field}>
      {arrValues.map((cell) => (
        <Cell key={cell.id} typeCell={cell} onClick={handleClick} />
      ))}
    </div>
  )
}
export default Field
