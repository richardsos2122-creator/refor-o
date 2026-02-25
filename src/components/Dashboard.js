import React from 'react'

export default function Dashboard({user, view, setView, children, onLogout}){
  return (
    <div className="app-root">
      <header className="top">
        <div className="brand">
          <div className="brand-text">Avance Reforço</div>
        </div>
        <div className="user-area">
          <div>{user}</div>
          <button className="btn small" onClick={onLogout}>Sair</button>
        </div>
      </header>
      <nav className="sidebar">
        <button className={view==='attendance'?'active':''} onClick={()=>setView('attendance')}>Frequência</button>
        <button className={view==='students'?'active':''} onClick={()=>setView('students')}>Alunos</button>
        <button className={view==='calendar'?'active':''} onClick={()=>setView('calendar')}>Calendário</button>
        <button className={view==='accounts'?'active':''} onClick={()=>setView('accounts')}>Contas</button>
      </nav>
      <main className="content">
        {children}
      </main>
    </div>
  )
}
