import { ReactNode } from 'react'

const Game = ({ children,className }: { children: ReactNode , className:string}) => {
  return <div className={className}>{children}</div>
}
export default Game
