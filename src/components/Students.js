import React, {useState, useEffect} from 'react'
import db from '../db'

export default function Students(){
  const [name, setName] = useState('')
  const [students, setStudents] = useState([])

  useEffect(()=> setStudents(db.getStudents()), [])

  function handleAdd(e){
    e.preventDefault()
    if(!name) return
    db.addStudent(name)
    setStudents(db.getStudents())
    setName('')
  }

  function handleRemove(id){
    db.removeStudent(id)
    setStudents(db.getStudents())
  }

  return (
    <div>
      <h2>Alunos</h2>
      <form onSubmit={handleAdd} className="form-inline">
        <input placeholder="Nome do aluno" value={name} onChange={e=>setName(e.target.value)} />
        <button className="btn">Adicionar</button>
      </form>
      <div className="list">
        {students.map(s=> (
          <div className="list-item" key={s.id}>
            <div>{s.name}</div>
            <div><button className="btn small" onClick={()=>handleRemove(s.id)}>Remover</button></div>
          </div>
        ))}
      </div>
    </div>
  )
}
