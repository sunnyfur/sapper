import { useEffect } from 'react'
import { cellClick, isWin, newGame, setRightClick } from '../../store/actions/gameActions'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { cellsAll, gameActions } from '../../store/reducers/gameReducer'
import { mouseActions } from '../../store/reducers/mouseReducer'
import { EnumCell, SmileStatus } from '../../types/enums'
import Cell from '../cell/Cell'
import styles from './field.module.scss'

const Field = () => {
  const { isGame } = useAppSelector((state) => state.game)
  const { isPressed } = useAppSelector((state) => state.mouse)
  const cells = useAppSelector((state) => cellsAll(state.game))

  useEffect(() => {
    dispatch(newGame())
  }, [])

  const dispatch = useAppDispatch()
  const handleRightButton = (id: number) => {
    if (!isGame) return
    dispatch(setRightClick(id))
    dispatch(isWin())
  }

  const handleOnMouseDown = (id: number) => {
    if (!isGame) return
    dispatch(mouseActions.setIsPressed(true))
    if (!cells[id].isOpened) {
      dispatch(gameActions.updateCell({ id: id, changes: { type: EnumCell.pressed } }))
      dispatch(gameActions.setSmileStaus(SmileStatus.suprise))
    }
  }
  const handleOnMouseUp = (id: number) => {
    if (!isGame) return
    if (!cells[id].isOpened) {
      dispatch(cellClick(id))
    }
  }
  const handleOnMouseEnter = (id: number) => {
    if (!isGame) return
    if (isPressed && !cells[id].isOpened && cells[id].type == EnumCell.common) {
      dispatch(gameActions.updateCell({ id: id, changes: { type: EnumCell.pressed } }))
      dispatch(gameActions.setSmileStaus(SmileStatus.suprise))
    }
    if (isPressed && cells[id].isOpened && !cells[id].isMine)
      dispatch(gameActions.setSmileStaus(SmileStatus.common))
  }
  const handleOnMouseLeave = (id: number) => {
    if (!isGame) return
    if (isPressed && !cells[id].isOpened && cells[id].type == EnumCell.pressed)
      dispatch(gameActions.updateCell({ id: id, changes: { type: EnumCell.common } }))
    if (isPressed && cells[id].isOpened && !cells[id].isMine)
      dispatch(gameActions.setSmileStaus(SmileStatus.common))
  }

  const handleFieldLeave = () => {
    if (!isGame) return
    if (isPressed) dispatch(gameActions.setSmileStaus(SmileStatus.common))
  }

  return (
    <div className={styles.field} onMouseLeave={handleFieldLeave}>
      {cells.map((cell) => (
        <Cell
          key={cell.id}
          typeCell={cell}
          onMouseDown={handleOnMouseDown}
          onMouseUp={handleOnMouseUp}
          onContextMenu={handleRightButton}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
      ))}
    </div>
  )
}
export default Field
