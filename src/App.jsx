import { useState } from 'react'
import image from './assets/i1.png'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <img src={image} alt="" />
    </>
  )
}

export default App
