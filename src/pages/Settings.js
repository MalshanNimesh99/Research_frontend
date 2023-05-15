import React,{useState,useEffect} from 'react'
import {Link,useParams,useNavigate} from "react-router-dom";
import axios from "axios";
import Header from '../components/Header.js';


const initialState = {
	name:"",
	email:"",
	mobile:"",
	dependent:""
};


const Settings = () =>{
const navigate = useNavigate();

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

	const [state,setState]=useState(initialState);
	const [fileData, setFileData] = useState("");

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0]);
  };


	const {name,email,mobile,dependent} = initialState;

	 const updateUser = async (id,userData) =>{		

		const response=await axios.put(`http://localhost:5001/updateUser/${id}`,userData)
		if (response.status===200){
			alert("Updated sucessfully")
			navigate('/mainhome');
		}else{
			alert("update fail")
		}
	}

	const getSingleUser = async (id) =>{
		const response=await axios.get(`http://localhost:5001/getuser/${id}`)
		console.log(response.data)
		const dataset={
			name:response.data.name,
			email:response.data.email,
			mobile:response.data.mobile,
			dependent:response.data.dependent
		}
		setState(dataset)	
	}

	
	const imageUrl = "http://localhost:5001/public/1663610340968--profile.png";
		const [img, setImg] = useState();

		const fetchImage = async () => {
	    const res = await fetch(imageUrl);
	    const imageBlob = await res.blob();
	    const imageObjectURL = URL.createObjectURL(imageBlob);
	    setImg(imageObjectURL);
	  };


	const handleSubmit = (event) =>{
		event.preventDefault()
		if(id){
			const newename = event.target.name.value;
			const newemail = event.target.email.value;
	    const newmobile = event.target.mobile.value;
	    const dependent = event.target.dependent.value

	    if(dependent===""){
	    		let userData = {
	              "name": newename,
	              "mobile": newmobile,
	              "dependent":""
	            }
	        updateUser(id,userData)    
	    }else{
	    		let userData = {
	              "name": newename,
	              "mobile": newmobile,
	              "dependent":dependent
	            }
	        updateUser(id,userData)    
	    }
			
		}else{
			alert("invalid path")
		}
				
	}


	
	const handleInputChange =(e) =>{
		let {name,value} =e.target;
		setState({...state,[name]: value })
	}

	useEffect(() =>{
		if(id){
			getSingleUser(id);
			fetchImage();
			
		}else{
			handleSubmit()
		}
	},[id,state])



	return(
		<div style={{paddingBottom:"100px"}}>
		<Header />
		<div className="handledivset" style={{marginTop:"50px" ,paddingBottom:"100px" , width:"800px"}}>
		<form onSubmit={ handleSubmit }>
        <h2>Settings</h2>
        <div className="mb-3">

          <label style={{float:"left"}}>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            name="name"
            onChange={handleInputChange}
            id="name"
            defaultValue={state.name}
          />
        </div>
        <div className="mb-3">
        <label style={{float:"left"}}>Email</label>
        <input
            type="text"
            className="form-control"
            placeholder="First name"
            name="email"
            id="email"
            onChange={handleInputChange}
            defaultValue={state.email}
          /></div>
        <div className="mb-3">
          <label style={{float:"left"}}>Mobile Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter mobile number"
            name="mobile"
            id="mobile"
            onChange={handleInputChange}
            defaultValue={state.mobile}
          />
        </div>
        <div className="mb-3" style={{display:"none"}}>
          <label style={{float:"left"}}>Dependent</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter dependent"
            name="dependent"
            id="dependent"
            onChange={handleInputChange}
            defaultValue={state.dependent}
          />
        </div>
        <div className="mb-3" >
	          <label style={{float:"left"}}>Edit Pofile Picture</label><br/>
	          <input type="file" class="form-control" style={{width:"300px"}} accept="image/*" onChange={(e)=>{uploadbase64(e)}} />
	        </div> 
        <div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>         
      </form>
          
		</div>	
		</div>
		);
};	
export default Settings

