import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import NotFund from './pages/404'
import Chat from './pages/chat/chat'
import Home from './pages/home/home'

function App () {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/*' element={<NotFund />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
