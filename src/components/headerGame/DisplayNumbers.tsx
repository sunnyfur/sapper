import { useEffect, useState } from 'react'
import styles from './header.module.scss'

const DisplayNumber = ({ symbol }: { symbol: string }) => {
  return (
    <img className={styles.number} alt={symbol} src={require(`../../assets/img/${symbol}.png`)} />
  )
}

const DisplayNumbers = ({ count }: { count: number }) => {
  const [first, setFirst] = useState(0)
  const [second, setSecond] = useState(0)
  const [third, setThird] = useState(0)
  useEffect(() => {
    const numbers = (count < 0 ? 0 : count).toString().split('').reverse()
    setFirst(numbers.length > 2 ? +numbers[2] : 0)
    setSecond(numbers.length > 1 ? +numbers[1] : 0)
    setThird(+numbers[0])
  }, [count])

  return (
    <div className={styles.numbers}>
      <DisplayNumber symbol={first.toString()} />
      <DisplayNumber symbol={second.toString()} />
      <DisplayNumber symbol={third.toString()} />
    </div>
  )
}
export default DisplayNumbers
