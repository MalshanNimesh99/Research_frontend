import React, { Component } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/authcss.css"

const SignUp = () =>{

const navigate = useNavigate();

const onFormSubmit=(event) =>{

    
  const name = event.target.name.value;
  const password = event.target.password.value;
  const email = event.target.email.value;
  const birthday = event.target.birthday.value;
  const mobile = event.target.mobile.value;
  const confirmPasswod = event.target.confirmPasswod.value;
  const dependent="";
  const image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAAB6CAMAAABHh7fWAAAAPFBMVEWZmZn///+UlJScnJz8/Pz4+Pjq6urHx8e0tLSfn5/Y2Nijo6PU1NTh4eGQkJC3t7fw8PCrq6u+vr7Nzc0lxIrrAAAC0klEQVRoge2aDXOcIBBAZQH5VEH//38NeLbN3UUgyJppy9PRycXJk71FYM0wdDqdTqfT6XT+fuDgfq9ZhNXaisXcagcjHCMHzAlzlxyU/u097FrdIof1RbzL1xvcML2LIxO6m7qvzYQ4iqw+NQc3qvgs2vgxhy1lJmTDc6u0mRCFZU6HGzXkJmcmxOCYQefVGqfZlOfVHKdz+7yZEI9hBlGiFhgRz+d3BCXHYSxRj139L6h/MM1sidqiqGWJWqI8SdUX08FXGM6wWfJlI42asOTVC9KADdmhi2NNFfLNxmr0MMyZp8o4Y5kDySRniOIBktMFj7r2SX3deF/04ZYnac5xnmNPbvNlro23LO9BvCUbE/M9hQUA8RR1LoAqpMn/u3w2Qo+cMT5OwsxAjVFo6613OxyneKZmwFSfryvCb4zBqylQSuMh7sPjEAlt3j9XoPZL6HFhW/MQt7ArGkNMlZdyDSzSx0+AwnFP+5Vt3Q91aKda7OQ4YXHbd8LdZFcV7ojut9bcHHcAqV1QBdi+RUg8hTtwenmkHB3a9vHwB2cZFtgsanY1eahjq8OB7xHQfh5atzo2uGwJIFtXa8EXLQAiU9uxM1e1eqZhDQtoUaw/RZ02koMvmPs/w9oEHeS3zcHdYuJQZW7jNlXmFquvOVGFTuMuNvt7veqZi32soCx6zqU5U1n95IwrdZWyQsI5F7L8WqMvLfSLCrIpqou1ZTWjFNX1JKju07+o7tuX410d8bICeJrK8vhcPDE5Z6orccwF7zpy8Do1rRyzPlM5fjXIsso8KykO5qkqsLRI8MoUvzJU/6Fq0P5J9eUneKTqKf5/qgtf8aSpfakM/vXfbr4H1/XrHwDq7VgzajM3bf5idQFgpkaudhrdXkHIGLlzo95Wb2irFX64gb0k6L1c1lVs22at1Q+sDT+KvZbkjRrilUivfc5B8XU6nU6n0+l0buEDoakdVaswjjwAAAAASUVORK5CYII="

  const addUser = async(sendData) =>{

    const response=await axios.post("http://localhost:5001/register",sendData)
    if (response.status===200){
      console.log(response.data)
      const data=response.data
        if(data.status=="success"){
          alert("Successfully Register")
          navigate('/sign-in');
        }else{
          alert(data.msg)
        };        
    }else{
        alert("Error response")
        console.log(response.data)
    }
  }

  const sendData = {
    "email": email,
    "password": password,
    "name": name,
    "birthday": birthday,
    "mobile": mobile,
    "dependent":dependent,
    "image":image
  }

  if(password===confirmPasswod){
    addUser(sendData)
  }else{
    alert("password not matching")
  }
  event.preventDefault();
};


return (
  <section class="vh-100">
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-4">
         {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="img-fluid" alt="Sample image"></img>  */}
      </div>
      <div class="col-md-8 col-lg-6 col-xl-5 offset-xl-1">
        {/*  */}
        <div className="handlediv">  
      <form onSubmit={ onFormSubmit }>
        <h3 style={{textAlign:"left"}}>Sign Up</h3><br></br>
        <div className="mb-3">
          <label style={{float:"left"}}>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            name="name"
          />
        </div>
        <div className="mb-3">
          <label style={{float:"left"}}>Date of Birth</label>
          <input type="date" className="form-control" name="birthday" />
        </div>
        <div className="mb-3">
          <label style={{float:"left"}}>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
          />
        </div>        
        <div className="mb-3">
          <label style={{float:"left"}}>Mobile Number</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter mobile number"
            name="mobile"
          />
        </div>
        <div className="mb-3">
          <label style={{float:"left"}}>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
          />
        </div>
        <div className="mb-3">
          <label style={{float:"left"}}>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="confirmPasswod"
          />
        </div>
        <div ><br></br>
          <button class="btn btn-primary" style={{width:"250px"}} type="submit" >
            Sign Up
          </button>
        </div><br></br>
        <p className="forgot-password text-right">
          Already Registered <a href="/sign-in">Sign In?</a>
        </p>
      </form>
      </div>
            </div>
    </div>
  </div>
</section>
    )

};
export default SignUp