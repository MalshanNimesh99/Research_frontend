import React,{useState,Component,useEffect} from 'react'
import {Link,useNavigate, useLocation} from "react-router-dom";
import axios from "axios";
import Header from '../components/Header.js';
import '../css/main.css'


const MainHome = () =>{
    const location= useLocation();
    const [activeTab,setActiveTab] = useState("MainHome")

    useEffect(() =>{

		if(location.pathname==="/cognhome"){
			setActiveTab("CognHome");
		}else if(location.pathname==="/braintumor"){
				setActiveTab("BrainTumor");
		}else if(location.pathname==="/demented"){
            setActiveTab("Demented");
        }else if(location.pathname==="/pneumonia"){
            setActiveTab("Pneumonia");
        }
    }
    )
	return(
		
	<div> 
		<Header />
        <br></br><br></br>
		<div class="card">
  			<div class="card-body">
			  <Link to="/cognhome"  class="mainlink">
				<p  className={`${activeTab==="CognHome" ? "active":""}`}  onClick={() => setActiveTab("CognHome")}>Dementia Group & CDR Detection</p>
			</Link>
			</div>
		</div><br></br>
		<div class="card">
			<div class="card-body">
			<Link to="/demented"  class="mainlink">
				<p className={`${activeTab==="Demented" ? "active":""}`}  onClick={() => setActiveTab("Demented")}>Dementia Detection</p>
			</Link>
			</div>
		</div><br></br>
		<div class="card">
			<div class="card-body">
			<Link to="/braintumor" class="mainlink">
				<p className={`${activeTab==="BrainTumor" ? "active":""}`}  onClick={() => setActiveTab("BrainTumor")}>Brain Tumor Detection</p>
			</Link>
			</div>
			</div><br></br>
		<div class="card">
			<div class="card-body">
			<Link to="/pneumonia" class="mainlink">
				<p className={`${activeTab==="Pneumonia" ? "active":""}`}  onClick={() => setActiveTab("Pneumonia")}>Pneumonia Detection</p>
			</Link>
			</div>
		</div><br></br>
			
                        
	</div>
		)
		
}

export default MainHome