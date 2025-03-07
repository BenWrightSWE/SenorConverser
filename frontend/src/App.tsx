import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/Speak.tsx'
import './components/ChatLog.tsx'
import Speak from "./components/Speak.tsx";
import ChatLog from "./components/ChatLog.tsx";

function App() {

  return (
    <>
      <h1>Señor Converser</h1>
        <Speak></Speak>
        <ChatLog></ChatLog>
    </>
  )
}

export default App
