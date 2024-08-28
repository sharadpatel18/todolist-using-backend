import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Lists from '../components/Lists';
import './App.css';

function App() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [updateId , setUpdateID] = useState(null)
  const [lists , setLists] = useState([])
  const [updateUi , setUpdateUi] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();       
    Axios.post("http://localhost:4000/todolist" , {title,note})
    .then((res)=>{
      setUpdateUi((prevState)=>!prevState)
    })
    .catch((err)=>console.log(err))
  }

  useEffect(()=>{
    fetch("http://localhost:4000/todolist/api", {
      method: "get",
    })
    .then((res)=> res.json())
    .then((data)=>{
      setLists(data)
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [updateUi])

  const handleEdit = (id , title , note) => {
    console.log(title,note);
    setTitle(title)
    setNote(note)
    setUpdateID(id)
  }

  const updateTask = () => {
    Axios.put(`http://localhost:4000/todolist/${updateId}` , {title,note})
    .then((res)=>console.log(res.data))
    .catch((err)=>console.log(err))
  }

  return (
    <>
      <div className='main'>
        <div className="container">
          <form onSubmit={updateId ? updateTask : handleSubmit}>
          <h4>todolist-with-backend</h4>
            <div className="title">
              <label htmlFor="title">Title </label>
              <input type="text" placeholder='enter title' value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="note">
              <label htmlFor="note">Note </label>
              <textarea name="note" placeholder='enter notes' value={note} onChange={(e) => setNote(e.target.value)}></textarea>
            </div>
            <button className='btn btn-primary'>{updateId ? "Update Todo" : "Add Task"}</button>
          </form>
        </div>
        <div className="output">
            <ul>
              {
                lists.map((todo)=> (
                  <Lists key={todo._id} id={todo._id} title={todo.title} note={todo.note} handleEdit={handleEdit} setUpdateUi={setUpdateUi}/>
                ))
              }
            </ul>
        </div>
      </div>
    </>
  )
}

export default App
