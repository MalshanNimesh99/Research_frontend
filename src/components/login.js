import React, { Component } from 'react'
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import "../css/authcss.css"
import "../css/newcss.css"

const Login = () =>{

 
const navigate = useNavigate();

const onFormSubmit=(event) =>{
  	
  const email = event.target.theEmail.value;
  const password = event.target.thePassword.value;
  
  const getUsers = async(sendData) =>{
  	const response=await axios.post("http://localhost:5001/login",sendData)
    if (response.status===200){
      
  		const data = response.data

      if(data.status=="success"){
              let userData = {

              "user": data.name,
              "id": data._id,
              "email": data.email,
              "mobile": data.mobile,
              "dependent":data.dependent,
              "image":data.image
            }

            let userImage = {
              "image":data.image
            }

            window.sessionStorage.setItem('activeuser', JSON.stringify(userData));
            window.sessionStorage.setItem('image', JSON.stringify(userImage));
            navigate('/mainhome');
            
          }else{
            alert("Invalid login ID")
          }
  	}else{
  		alert("Error response")
  	}
  }

  const sendData = {
    "email": email,
    "password": password
  }

  getUsers(sendData)
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
        <div className="handlediv" style={{width:"100%",height:"100%", marginTop:"100px"}}> 
            <form onSubmit={ onFormSubmit }>
              <h3 style={{textAlign:"left"}}>Sign In</h3><br></br>
              <div className="mb-3">
                <label style={{float:"left"}}>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  name="theEmail"
                  required
                />
              </div>
              <div className="mb-3">
                <label style={{float:"left"}}>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="thePassword"
                  required
                />
              </div>
              <div className="mb-3">
                <div className="custom-control custom-checkbox">
                  <input style={{marginRight:"5px"}}
                    type="checkbox"
                    class="form-check-input"
                    id="customCheck1"
                  />
                  <label class="form-check-label"  htmlFor="customCheck1"> Remember Me
                  </label>
                </div>
              </div>
              <div>
                <button type="submit" class="btn btn-primary" style={{width:"250px"}}>
                  Submit
                </button>
              </div>
              <br></br>
              <p className="forgot-password text-right">
          Don't have an account?<a href="/sign-up">Sign In?</a></p>
            </form>
            </div>
            </div>
    </div>
  </div>
</section>
    );
  
};

export default Login