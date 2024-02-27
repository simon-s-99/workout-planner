import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Test} from './components/Test'

function App() {

  return (
    <div className="App">
      <Test name={"My heading"}></Test>
    </div>
  )
}

export default App
