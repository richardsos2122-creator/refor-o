const USERS_KEY = 'avanca_users_v1'
const STUDENTS_KEY = 'avanca_students_v1'
const ATT_KEY = 'avanca_attendance_v1'

function _read(key){
  try{ return JSON.parse(localStorage.getItem(key)) || [] }catch(e){return []}
}
function _write(key, val){ localStorage.setItem(key, JSON.stringify(val)) }

// simple non-cryptographic hash for local storage (not for production)
function simpleHash(str){
  let hash = 5381
  for(let i=0;i<str.length;i++) hash = ((hash<<5) + hash) + str.charCodeAt(i)
  return (hash >>> 0).toString(16)
}

export function getUsers(){ return _read(USERS_KEY) }
export function addUser(username, password){
  const users = getUsers()
  if(users.find(u=>u.username===username)) return {ok:false, error:'Usuário já existe'}
  const passwordHash = simpleHash(password)
  users.push({id:Date.now(), username, passwordHash})
  _write(USERS_KEY, users)
  return {ok:true}
}
export function validateUser(username, password){
  const users = getUsers()
  const passwordHash = simpleHash(password)
  const u = users.find(x=>x.username===username && x.passwordHash===passwordHash)
  return !!u
}
export function removeUser(id){
  const users = getUsers().filter(u=>String(u.id)!==String(id))
  _write(USERS_KEY, users)
}
export function updateUserPassword(id, newPassword){
  const users = getUsers()
  const idx = users.findIndex(u=>String(u.id)===String(id))
  if(idx>=0){ users[idx].passwordHash = simpleHash(newPassword); _write(USERS_KEY, users); return true }
  return false
}

export function getStudents(){ return _read(STUDENTS_KEY) }
export function addStudent(name){
  const students = getStudents()
  const s = {id:Date.now(), name}
  students.push(s)
  _write(STUDENTS_KEY, students)
  return s
}
export function removeStudent(id){
  const students = getStudents().filter(s=>String(s.id)!==String(id))
  _write(STUDENTS_KEY, students)
}

export function getAttendance(){ return _read(ATT_KEY) }
export function getAttendanceForDate(dateKey){
  const all = getAttendance()
  return all.find(a=>a.date===dateKey)?.records || []
}
export function setAttendanceForDate(dateKey, records){
  const all = getAttendance()
  const idx = all.findIndex(a=>a.date===dateKey)
  if(idx>=0) all[idx].records = records
  else all.push({date:dateKey, records})
  _write(ATT_KEY, all)
}

export function getHolidays(){
  return [
    {date:'2026-04-21', title:'Tiradentes (Recesso)'},
    {date:'2026-11-15', title:'Proclamação da República'},
    {date:'2026-12-25', title:'Natal - Recesso'}
  ]
}

// bootstrap
if(!localStorage.getItem(USERS_KEY)){
  _write(USERS_KEY, [{id:1, username:'admin', passwordHash: simpleHash('admin')}])
}
if(!localStorage.getItem(STUDENTS_KEY)){
  _write(STUDENTS_KEY, [{id:1, name:'Ana Silva'},{id:2, name:'Bruno Costa'},{id:3, name:'Carla Pereira'}])
}

export default {getUsers, addUser, validateUser, removeUser, updateUserPassword, getStudents, addStudent, removeStudent, getAttendanceForDate, setAttendanceForDate, getHolidays}
