import { useState } from 'react'
import './App.css'
import Cau2 from './components/Cau2'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full h-full p-6 bg-gray-300 flex justify-center items-center">
      <Cau2 />
    </div>
  )
}

export default App
