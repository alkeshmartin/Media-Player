import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { addToHistory, deleteVideo } from '../services/allAPI';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';


function Videocard({displayVideo,setDeleteVideoStatus}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async () =>
    {
      setShow(true);
      // 3 data need to be inserted 1) caption 2)Link 3) Time stamp
      const{caption,embededLink}=displayVideo;
      const today = new Date;
      console.log("===today===",today);
      const timeStamp = new Intl.DateTimeFormat('en-us',{
        year:'numeric',
        month:'2-digit',
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit'
      }).format(today)
      console.log(timeStamp)
      let videoDetails = {
        caption:caption,
        embededLink:embededLink,
        timeStamp:timeStamp
      }
      await addToHistory(videoDetails)
    } 
  const removeVideo = async(id)=>{
    const response = await deleteVideo(id)
    setDeleteVideoStatus(true)
    
  }
  return (
    <>
      <Card style={{ width: '18rem' }} onClick={handleShow}>
      <Card.Img variant="top" height="250px" width="100%" src={displayVideo.url} />
      <Card.Body>
        <div className='d-flex align-items-center justify-content-evenly'>
        <Card.Title>{displayVideo.caption}</Card.Title>
        <Button variant="danger"><i class="fa-solid fa-trash ms-1" onClick={()=>removeVideo(displayVideo.id)}></i></Button>
        </div>
      </Card.Body>
    </Card>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{displayVideo.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe width="100%" height="200px" src={`${displayVideo.embededLink}?autoplay=1`}
        title="YouTube video player" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Videocard