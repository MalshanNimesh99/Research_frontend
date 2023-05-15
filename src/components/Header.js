import React,{useEffect,useState} from 'react'
import {Link,useLocation} from "react-router-dom"
import ReactDOM from 'react-dom'
import axios from "axios";
import "../css/Header.css"

const initialState = {
	image:" ",
};

const Header = () =>{

	const [state,setState]=useState(initialState);	
	const [activeTab,setActiveTab] = useState("MainHome")

	const getSingleUser = async (id) =>{
		const response=await axios.get(`http://localhost:5001/getuser/${id}`)
		const dataset={
			image:response.data.image
		}
		setState(dataset)	
	}

	const logout =  () =>{
			sessionStorage.clear();
			alert("logout")
	}


	useEffect(() =>{
				const user=JSON.parse(sessionStorage.getItem("activeuser"));
				getSingleUser(user.id);

			},[state])

	const location= useLocation();
	
	useEffect(() =>{

		if(location.pathname==="/mainhome"){
			setActiveTab("MainHome");
		}else if(location.pathname==="/cognhome"){
			setActiveTab("CognHome");
		}else if(location.pathname==="/braintumor"){
				setActiveTab("BrainTumor");
		}else if(location.pathname ==="/history:id"){
			setActiveTab("History");
		}
		else if(location.pathname ==="/settings:id"){
			setActiveTab("Settings");
		}

	},[location])

	const user=JSON.parse(sessionStorage.getItem("activeuser"));




	return(
		<div className="topnav">
		
			<img className="imgProfile" src={state.image} alt="Red dot" />

			 <p><h3 className="h3clolor">Doctor Assistive System</h3></p> 
			<div className="header-right">
			<Link to="/mainhome">
			 	<p className={`${activeTab==="MainHome" ? "active":""}`}  onClick={() => setActiveTab("MainHome")}>Home</p>
			 </Link>
			 <Link to={`/settings/${user.id}`}>
			 	<p className="split" onClick={() => setActiveTab("Settings")} >Settings</p>
			 </Link>
			 <Link to={`/`}>
			 	<p className={`${activeTab==="Adduser" ? "active":""}`} onClick={() => logout()} >Logout</p>
			 </Link>
		 </div>
		</div>
		)
}

export default Header