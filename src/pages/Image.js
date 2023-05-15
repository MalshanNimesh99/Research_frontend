import React, { useState } from "react";
import { Button, Form } from "react-form-elements";
import {Link,useParams,useNavigate} from "react-router-dom";
import axios from "axios";
import Header from '../components/Header.js';


function EditProfile() {


  const {id} = useParams();
  const uploadbase64 = async(e) =>{
    const file=e.target.files[0]

    const base64 = await convertBase64(file)
    const userData={
        img:base64
      }
    let userImage = {
            "image":base64
      }
    window.sessionStorage.setItem('image', JSON.stringify(userImage));      
    const response=await axios.put(`http://localhost:5001/updateAnUserImage/${id}`,userData)
      if (response.status===200){
        alert("Updated sucessfully")
        // navigate('/home');
      }else{
        alert("update fail")
      }
  }

  const convertBase64=(file)=>{
      return new Promise((resolve,reject)=>{
        const fileReader=new FileReader();
        fileReader.readAsDataURL(file)

        fileReader.onload = () =>{
          resolve(fileReader.result)
        };

        fileReader.onerror=(error)=>{
          reject(error)
        }

      })
  };


  return (
    <div>
    <Header />
     <div className="mb-3">
        <h3>Edit Pofile Picture</h3><br/>
        <input type="file" onChange={(e)=>{uploadbase64(e)}} />
      </div>
    </div>
  );
}

export default EditProfile;