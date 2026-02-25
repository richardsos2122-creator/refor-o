import React from 'react'

export default function Modal({open, title, children, onClose}){
  if(!open) return null
  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <strong>{title}</strong>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-actions">
          <button className="btn" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  )
}
