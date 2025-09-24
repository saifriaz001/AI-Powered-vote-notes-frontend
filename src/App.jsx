import { useState } from 'react'
import TranscribePage from './pages/TranscribePage'
import './App.css'

import Page from './pages/Page'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import VoiceNoteHome from './pages/VoiceNoteHome'
import AllNotes from './pages/AllNotes'

function App() {
  return (
     <div>

      <Routes>
      <Route path="/" element={<Page />}>
          <Route index element={<VoiceNoteHome/>}/>
          <Route path ="all-notes" element={<AllNotes/>}/>
      </Route>
      </Routes>



     </div>
  )
}

export default App
