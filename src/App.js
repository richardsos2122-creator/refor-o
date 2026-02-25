import './App.css';
import React, {useState} from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Attendance from './components/Attendance'
import Students from './components/Students'
import CalendarView from './components/CalendarView'
import Accounts from './components/Accounts'

function App(){
  const [user, setUser] = useState(null)
  const [view, setView] = useState('attendance')

  function handleLogin(username){ setUser(username) }
  function handleLogout(){ setUser(null) }

  if(!user) return <Login onLogin={handleLogin} />

  return (
    <Dashboard user={user} view={view} setView={setView} onLogout={handleLogout}>
      {view==='attendance' && <Attendance />}
      {view==='students' && <Students />}
      {view==='calendar' && <CalendarView />}
      {view==='accounts' && <Accounts />}
    </Dashboard>
  )
}

export default App;
