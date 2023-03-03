import React, { useEffect, useState } from 'react'
import { TypeCell } from '../../types/types'
import styles from './cell.module.scss'

type Props = {
  typeCell: TypeCell
  onClick: (id: number) => void
  onContextMenu: (id: number) => void
}
const Cell = ({ typeCell, onClick, onContextMenu }: Props) => {
  const handleRightButt = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()

    onContextMenu(typeCell.id)
  }
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.button == 0) onClick(typeCell.id)
  }
  const [img, setImg] = useState<string | null>()

  useEffect(() => {
    import(`../../assets/img/cell_${typeCell.type}.png`).then((image) => setImg(image.default))
  }, [typeCell.type])
  const setImage = {
    backgroundImage: img ? `url(${img})` : '',
  }
  return (
    <div
      className={styles.cell}
      style={setImage}
      onClick={handleClick}
      onContextMenu={handleRightButt}
      onMouseUp={handleClick}
    />
  )
}
export default Cell
