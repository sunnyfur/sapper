import Field from './components/field/Field'
import Game from './components/game/Game'
import HeaderGame from './components/headerGame/HeaderGame'
import styles from './app.module.scss'
import { useAppDispatch } from './store/hooks'
import { mouseActions } from './store/reducers/mouseReducer'

function App() {
  const dispatch = useAppDispatch()
  const handleMouseUp = () => {
    dispatch(mouseActions.setIsPressed(false))
  }
  return (
    <div className={styles.app} onMouseUp={handleMouseUp}>
      <Game className={styles.game__container}>
        <HeaderGame />
        <Field />
      </Game>
    </div>
  )
}

export default App
