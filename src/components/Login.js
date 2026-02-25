import React, {useState} from 'react'
import db from '../db'

export default function Login({onLogin}){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleLogin(e){
    e.preventDefault()
    if(db.validateUser(username, password)){
      onLogin(username)
    }else{
      setError('Usuário ou senha inválidos')
    }
  }

  function handleRegister(e){
    e.preventDefault()
    const res = db.addUser(username, password)
    if(res.ok){
      onLogin(username)
    }else setError(res.error)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo">Avance<span className="dot">.</span></div>
        <p className="subtitle">Reforço escolar — Acesse sua conta</p>
        <form onSubmit={handleLogin}>
          <label>Usuário</label>
          <input value={username} onChange={e=>setUsername(e.target.value)} required />
          <label>Senha</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          {error && <div className="error">{error}</div>}
          <div className="actions">
            <button type="submit" className="btn primary">Entrar</button>
            <button onClick={handleRegister} className="btn" type="button">Criar conta</button>
          </div>
        </form>
        <div className="hint">Usuário padrão: <strong>admin</strong> / senha: <strong>admin</strong></div>
      </div>
    </div>
  )
}
