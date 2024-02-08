import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteHistory, getAllhistory } from '../services/allAPI'

function Watchhistory() {
  const[history,setHistory]=useState([])
  async function WatchHistory() {
    const response = await getAllhistory()
    const {data}= response;
    setHistory(data)
  }
  useEffect(()=>{
    WatchHistory()
  }
  ,[]) 
  const handleDelete = async (id)=>{
    await deleteHistory(id)
    WatchHistory()
  }
  return (
    <>
      <div className='container mt-5 mb-5 d-flex justify-content-between'>
        <h3>Watch History</h3>
        <Link to='/home' style={{textDecoration:"none",color:"white",fontSize:"15px", fontWeight:"600"}}>
        <i class="fa-solid fa-arrow-left me-2"></i>Back to home
        </Link>
      </div>
      <table className='table container mb-5'>
        <thead>
          <tr>
            <th>#</th>
            <th>Caption</th>
            <th>URL</th>
            <th>TimeStamp</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            history.length>0?
            history.map((item,index)=>(
              <tr>
                <td>{index+1}</td>
                <td>{item.caption}</td>
                <td>{item.embededLink}</td>
                <td>{item.timeStamp}</td>
                <td><button className='btn btn-warning ' ><i class="fa-solid fa-trash" onClick={()=>handleDelete(item.id)}></i></button></td>
              </tr>
            ))
  :
            <p>No watch history found!</p>
          }

        </tbody>
      </table>
    </>
  )
}

export default Watchhistory