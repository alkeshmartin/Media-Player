import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { uploadVideo } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Add({setUploadVideoStatus}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [video, setVideo] = useState({
    id: "",
    caption:"",
    url:"",
    embededLink:""
  })
  const embededVideoLink=(e)=>{
    const { value }= e.target;
    const videoLink=`https://www.youtube.com/embed/${value.slice(-11)}`
    setVideo({...video,embededLink:videoLink})
  }
  const handleUpload=async()=>{
    const {id,caption,url,embededLink}=video
    if(!id || !caption || !url || !embededLink)
      {
        toast.warning("Please fill the form completely")
      }
    else
      {
        const response = await uploadVideo(video)
        console.log("response of uploaded video");
        console.log(response)
        if(response.status == 201)
          {
            toast.success(`Successfully uploaded the video ${video.caption}`)
            setUploadVideoStatus(response.data)
            handleClose();
          }
        else
          {
            toast.warning(`Error while uploading the video ${video.caption}`)
          }
      }
  }
  return (
    <>
    <div className='d-flex align-items-center'>
      <h5>Upload new video</h5>
      <button className='btn' onClick={handleShow}><i class="fa-solid fa-cloud-arrow-up fs-5" style={{color:"white"}}></i></button>
    </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title ><i class="fa-solid fa-film me-2 text-warning"></i>Upload Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please fill the following details.</p>
          <Form className='border border-secondary p-3 rounded'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter video ID" onChange={(e)=>setVideo({...video,id:e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter video Caption" onChange={(e)=>setVideo({...video,caption:e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter thumbnail image url" onChange={(e)=>setVideo({...video,url:e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter video Youtube Link" onChange={(e)=>embededVideoLink(e)}/>
            </Form.Group>
      </Form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} className='btn'>
            Cancel
          </Button>
          <Button variant="warning" className='btn' onClick={handleUpload}>Submit</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
position="top-center"
autoClose={2500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>    
    </>
  )
}

export default Add