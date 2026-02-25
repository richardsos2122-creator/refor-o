import React, {useState, useEffect} from 'react'
import db from '../db'

function todayKey(d=new Date()){ return d.toISOString().slice(0,10) }

export default function Attendance(){
  const [date, setDate] = useState(todayKey())
  const [students, setStudents] = useState([])
  const [records, setRecords] = useState([])

  useEffect(()=> setStudents(db.getStudents()), [])
  useEffect(()=> setRecords(db.getAttendanceForDate(date)), [date])

  function toggle(id){
    const next = records.includes(id) ? records.filter(x=>x!==id) : [...records, id]
    setRecords(next)
  }

  function handleSave(){
    db.setAttendanceForDate(date, records)
    alert('Frequência salva')
  }

  return (
    <div>
      <h2>Frequência</h2>
      <div className="controls">
        <label>Data: <input type="date" value={date} onChange={e=>setDate(e.target.value)} /></label>
        <button className="btn" onClick={handleSave}>Salvar</button>
      </div>
      <div className="list">
        {students.map(s=> (
          <div className="list-item" key={s.id}>
            <div>{s.name}</div>
            <div>
              <label className="switch">
                <input type="checkbox" checked={records.includes(s.id)} onChange={()=>toggle(s.id)} />
                <span className="slider" />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
