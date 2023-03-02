import { useEffect, useState } from 'react'
import { TypeCell } from '../../types/types'
import styles from './cell.module.scss'

const Cell = ({ typeCell, onClick }: { typeCell: TypeCell; onClick: (id: number) => void }) => {
  const handleClick = () => {
    onClick(typeCell.id)
  }
  const [img, setImg] = useState<string | null>()

  useEffect(() => {
    import(`../../assets/img/cell_${typeCell.type}.png`).then((image) => setImg(image.default))
    // setImg(`../../assets/img/cell_${typeCell.type}.png`)
  }, [typeCell.type])
  const setImage = {
    backgroundImage: img ? `url(${img})` : '',
  }
  return <div className={styles.cell} style={setImage} onClick={handleClick} />
}
export default Cell
