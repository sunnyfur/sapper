import { TypeCell } from '../../types/enums'
import styles from './cell.module.scss'

const Cell = ({ typeCell }: { typeCell: TypeCell }) => {
  const setImage = () => {}
  return <div className={styles.cell_empty} />
}
export default Cell
