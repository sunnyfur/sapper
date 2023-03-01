import Field from './components/field/Field'
import Game from './components/game/Game'
import HeaderGame from './components/headerGame/HeaderGame'
import styles from './app.module.scss'

function App() {
  return (
    <div className={styles.App}>
      <Game>
        <HeaderGame />
        <Field />
      </Game>
    </div>
  )
}

export default App
