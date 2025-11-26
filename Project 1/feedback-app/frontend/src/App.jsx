import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import Login from './login'
import Tasks from './components/tasks.jsx'
import Boards from './components/boards.jsx'
import './App.css';
import Dashboard from './components/Dashboard.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import FeedbackForm from './components/form.jsx'
import StickyHeader from './components/header.jsx'
import Submissions from './components/submissions.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/Dashboard' element={<Dashboard />}></Route>
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/boards" element={<Boards />} />
        <Route path='/form' element={<FeedbackForm />}></Route>
        <Route path='/submissions' element={<Submissions/>}></Route>
        <Route path='submission/:id' element={<Submissions />}></Route>
        
       </Routes>
    </BrowserRouter>
  )
}

export default App
