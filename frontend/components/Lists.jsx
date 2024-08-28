import React from 'react'
import Axios from 'axios'
const Lists = ({id,title,note , handleEdit , setUpdateUi}) => {
    const handleDelete = () => {
        Axios.delete(`http://localhost:4000/todolist/${id}`)
        .then((res)=>{
            console.log(res.data)
            setUpdateUi((prevState)=>!prevState)
        })
        .catch((err)=>console.log(err))
    }
  return (
    <>
        <li>
            <div>
                <label htmlFor="title">title: {title}</label>
            </div>
            <div>
                <label htmlFor="note">note: {note}</label>
            </div>
            <div>
                <button className='btn btn-success' onClick={() => handleEdit(id,title,note)}>edit</button>
                <button className='btn btn-danger' onClick={handleDelete}>delete</button>
            </div>
        </li>
    </>
  )
}

export default Lists