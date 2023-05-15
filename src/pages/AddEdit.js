import React,{useState,useEffect} from 'react'
import {useLocation,useParams} from "react-router-dom";
import "./Home.css";
import axios from "axios";

const initialState = {
	name:"",
	email:"",
	phone:"",
};

const AddEdit = () =>{

	const [state,setState]=useState(initialState);
	const {name,email,phone} = initialState;

	const addContent = async (data) =>{
		const response=await axios.post("http://localhost:5000/user",data)
		if (response.status===200){
			// toast.success(response.data)
			console.log("work add content")
		}
	}

	const updateUser = async (data,id) =>{
		const response=await axios.put(`http://localhost:5000/user/${id}`,data)
		if (response.status===200){
			// toast.success(response.data)
			console.log("work add content")
		}
	}

	// const navigate = useHistory();
	const {id} = useParams();

	const handleSubmit = (e) =>{
		e.preventDefault();
		if(!id){
			addContent(state)
		    // setTimeout(() =>navigate.push("/"),500 );
		}else{
			updateUser(state,id)
		}
		
		
	}

	const getSingleUser = async (data) =>{
		const response=await axios.get(`http://localhost:5000/user/${id}`)
		if (response.status===200){
			// toast.success(response.data)
			setState({...response.data[0]})
			console.log(...response.data[0])
		}
	}

	const handleInputChange =(e) =>{
		let {name,value} =e.target;
		setState({...state,[name]: value })
	}

	useEffect(() =>{
		if(id){
			getSingleUser(id);
		}
	},[id])

	


	return(
		<div style={{marginTop:"100px" }}>
			<h2>AddEdit</h2>

			<form style={{margin:"auto",padding:"15px",maxwidth:"400px",alignCotent:"center"}} onSubmit={handleSubmit}>

			<label htmlFor="name">Name</label>
			<input type="text" id="name" name="name" placeholder="enter Name..." onChange={handleInputChange} value={name} />

			<label htmlFor="email">email</label>
			<input type="text" id="email" name="email" placeholder="enter email..." onChange={handleInputChange} value={email} /> 

			<label htmlFor="phone">phone</label>
			<input type="text" id="phone" name="phone" placeholder="enter phone..." onChange={handleInputChange} value={phone} />			

			<input type="submit" value={id ? "Update" : "Add"} />
			</form>
		</div>
		);
};

export default AddEdit