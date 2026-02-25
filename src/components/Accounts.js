import React, {useState, useEffect} from 'react'
import db from '../db'
import Modal from './Modal'

export default function Accounts(){
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [newPass, setNewPass] = useState('')
  const [tab, setTab] = useState('add')

  useEffect(()=> setUsers(db.getUsers()), [])

  function refresh(){ setUsers(db.getUsers()) }

  function handleAdd(e){
    e.preventDefault()
    if(!username || !password) return
    const res = db.addUser(username, password)
    if(!res.ok){ alert(res.error); return }
    setUsername(''); setPassword('')
    refresh()
  }

  const [confirming, setConfirming] = useState(null)
  function handleRemove(id){ setConfirming(id) }
  function doRemove(){ if(confirming){ db.removeUser(confirming); refresh(); setConfirming(null) } }

  function startEdit(u){ setEditingId(u.id); setNewPass('') }
  function cancelEdit(){ setEditingId(null); setNewPass('') }
  function saveEdit(){ if(!newPass) return; db.updateUserPassword(editingId, newPass); cancelEdit(); refresh() }

  return (
    <div>
      <h2>Contas</h2>
      <div style={{display:'flex',gap:8,marginBottom:12}}>
        <button className={tab==='add'? 'active':''} onClick={()=>setTab('add')}>Adicionar Conta</button>
        <button className={tab==='list'? 'active':''} onClick={()=>setTab('list')}>Listar Contas</button>
      </div>

      {tab==='add' && (
        <form onSubmit={handleAdd} className="form-inline">
          <input placeholder="Usuário" value={username} onChange={e=>setUsername(e.target.value)} />
          <input placeholder="Senha" value={password} type="password" onChange={e=>setPassword(e.target.value)} />
          <button className="btn">Criar</button>
        </form>
      )}

      {tab==='list' && (
        <div className="list">
          {users.map(u=> (
            <div className="list-item" key={u.id}>
              <div style={{display:'flex',flexDirection:'column'}}>
                <div><strong>{u.username}</strong></div>
                <div style={{color:'#6b7280',fontSize:12}}>id: {u.id}</div>
              </div>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                {editingId===u.id ? (
                  <>
                    <input placeholder="Nova senha" value={newPass} type="password" onChange={e=>setNewPass(e.target.value)} />
                    <button className="btn small" onClick={saveEdit}>Salvar</button>
                    <button className="btn small" onClick={cancelEdit}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button className="btn small" onClick={()=>startEdit(u)}>Alterar senha</button>
                    <button className="btn small" onClick={()=>handleRemove(u.id)}>Remover</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={!!confirming} title="Confirmação" onClose={()=>setConfirming(null)}>
        <p>Deseja remover o usuário?</p>
        <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
          <button className="btn" onClick={()=>setConfirming(null)}>Cancelar</button>
          <button className="btn primary" onClick={doRemove}>Remover</button>
        </div>
      </Modal>
    </div>
  )
}
