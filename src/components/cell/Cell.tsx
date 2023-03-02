import { useEffect, useState } from 'react'
import { TypeCell } from '../../types/types'
import styles from './cell.module.scss'

const Cell = ({ typeCell, onClick }: { typeCell: TypeCell; onClick: (id: number) => void }) => {
  const handleClick = () => {
    onClick(typeCell.id)
  }
  const [img, setImg] = useState<string | null>()

  useEffect(() => {
    setImg(`../../assets/img/cell_${typeCell.type}.png`)
  }, [typeCell])
  const setImage = {
    backgroundImage: img ? require(img) : '',
  }
  return <div className={styles.cell} style={setImage} onClick={handleClick} />
}
export default Cell
