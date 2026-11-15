import './styles/global.css'
import {usePokedex} from './hooks/usePokedex.ts';

function App() {
  usePokedex();
  return (
    <>
      <h1>Hello World!</h1>
    </>
  )
}

export default App
