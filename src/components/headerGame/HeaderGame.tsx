import DisplayNumbers from './DisplayNumbers'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import styles from './header.module.scss'
import { gameActions } from '../../store/reducers/gameReducer'
import { SmileStatus } from '../../types/enums'
import { mouseActions } from '../../store/reducers/mouseReducer'
import { newGame } from '../../store/actions/gameActions'

const HeaderGame = () => {
  const [img, setImg] = useState<string | null>()
  const { isPressed } = useAppSelector((state) => state.mouse)
  const { time, minesCount, smileStatus } = useAppSelector((state) => state.game)

  useEffect(() => {
    import(`../../assets/img/${smileStatus}.png`).then((image) => setImg(image.default))
  }, [smileStatus])
  const setImage = {
    backgroundImage: img ? `url(${img})` : '',
  }
  const dispatch = useAppDispatch()
  const handleMouseEnter = () => {
    if (isPressed) dispatch(gameActions.setSmileStaus(SmileStatus.presed))
  }
  const handleMouseLeave = () => {
    if (isPressed) dispatch(gameActions.setSmileStaus(SmileStatus.common))
  }
  const handleMouseDown = () => {
    dispatch(mouseActions.setIsPressed(true))
    dispatch(gameActions.setSmileStaus(SmileStatus.presed))
  }
  const handleMouseUp = () => {
    dispatch(newGame())
  }
  return (
    <div className={styles.game__header}>
      <DisplayNumbers count={minesCount} />
      <div
        style={setImage}
        className={styles.smile}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
      <DisplayNumbers count={time} />
    </div>
  )
}
export default HeaderGame
