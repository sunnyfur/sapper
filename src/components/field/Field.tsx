import { TypeCell } from '../../types/enums'
import Cell from '../cell/Cell'
import styles from './field.module.scss'

const arrValues = Array(16 * 16).fill(0)
const Field = () => {
  return (
    <div className={styles.field}>
      {arrValues.map((cell, index) => (
        <Cell key={index} typeCell={TypeCell.cell1} />
      ))}
    </div>
  )
}
export default Field
