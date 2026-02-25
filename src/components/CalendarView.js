import React from 'react'
import {getHolidays} from '../db'

export default function CalendarView(){
  const holidays = getHolidays()
  return (
    <div>
      <h2>Calendário</h2>
      <p>Feriados e recessos cadastrados:</p>
      <div className="list">
        {holidays.map(h=> (
          <div className="list-item" key={h.date}>
            <div>{h.date}</div>
            <div>{h.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
