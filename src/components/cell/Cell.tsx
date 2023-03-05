import React, { useEffect, useState } from 'react'
import { TypeCell } from '../../types/types'
import styles from './cell.module.scss'

type Props = {
  typeCell: TypeCell
  onMouseDown: (id: number) => void
  onMouseUp: (id: number) => void
  onMouseEnter: (id: number) => void
  onMouseLeave: (id: number) => void
  onContextMenu: (id: number) => void
}
const Cell = ({
  typeCell,
  onContextMenu,
  onMouseUp,
  onMouseDown,
  onMouseLeave,
  onMouseEnter,
}: Props) => {
  const [img, setImg] = useState<string | null>()
  const handleRightButt = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    onContextMenu(typeCell.id)
  }
  const handleOnMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button == 2) return
    onMouseDown(typeCell.id)
  }
  const handleOnMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button == 2) return
    onMouseUp(typeCell.id)
  }
  const handleOnMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button == 2) return
    onMouseEnter(typeCell.id)
  }
  const handleOnMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button == 2) return
    onMouseLeave(typeCell.id)
  }

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
      onContextMenu={handleRightButt}
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    />
  )
}
export default Cell
