import React,{useState,useEffect} from 'react'
import {Link,useLocation,useParams} from "react-router-dom";
import axios from "axios";
import Header from '../components/Header.js';
import '../css/main.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
const initialState = {
	image:" ",
};

const View = () =>{

	//sdddddddddddddddddddddddddddddddddddd
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



	//Ddddddddddddddddddddddddddddddddddddddddddddddddd

	const {id} = useParams();
	const [data,setData]=useState([]);

	// #############################################
	  const imageUrl = "logo512.png";
		const [img, setImg] = useState();

		const fetchImage = async () => {
	    const res = await fetch(imageUrl);
	    const imageBlob = await res.blob();
	    const imageObjectURL = URL.createObjectURL(imageBlob);
	    setImg(imageObjectURL);
	  };
	// #############################################

	

	if(!id){
		// redicret to home
	}		
		
	useEffect(()=>{
		getUserHosory(id)
		getUserRecords(id)
	},[])	

	useEffect(()=>{
		fetchImage()
	},[])	
	    	
	const getUserHosory = async(id) =>{
	  	const response=await axios.get(`http://localhost:5001/medicalHistory/${id}`)
		  	if (response.status===200){
		  		 const resdata = response.data.data
		  		 setData(resdata)		          
		  	}else{
		  		alert("Error response")
		  	}
	}

	const [data1,setData1]=useState([]);

	const getUserRecords= async(id) =>{
	  	const response=await axios.get(`http://localhost:5001/allMeddicalRecords/${id}`)
		  	if (response.status===200){
		  		 const resdata = response.data.data
		  		 setData1(resdata)	          
		  	}else{
		  		alert("Error response")
		  	}
	}

	const onDeleteRecord = async(rec_id) =>{

	  	const response=await axios.delete(`http://localhost:5001/deleteRecord/${rec_id}`)
		  	if (response.status===200){
					getUserRecords(id)
					alert("Deleted Sucessfully")
		  	}else{
		  		alert("Error response")
		  	}
	}

	const onDeletePredict = async(pred_id) =>{

	  	const response=await axios.delete(`http://localhost:5001/deletePredict/${pred_id}`)
		  	if (response.status===200){
					getUserHosory(id)
					alert("Deleted Sucessfully")
		  	}else{
		  		alert("Error response")
		  	}
	}
		

	return(
		<div>
			<Header /><br></br><br></br>
			<div class="container text-center">
				<div class="row align-items-start">
					<div class="col-8">
						<div className="row">
							<br></br><br></br>
							<h3 style={{color:"white", fontWeight:"bold"}}>Prediction History</h3>
							<br></br><br></br>
								<table className="stuled-table" width="100%">
						<thead>
						<tr>
							<th style={{textAlign:"center"}}></th>
						</tr>
						</thead>
						<tbody>
						{data &&
							data.map((item,index)=>{
							return(
								<tr key={index}>
								<th >
								<div class="card">
														<div class="container">
															<h4><b>CDR Score</b></h4> 
															<p>{item.date}</p> 
															<p>{item.prediction}</p> 
															<button className="btn btn-danger paddingbtn" onClick={()=>onDeletePredict(item._id)}>Delete</button>
														</div>
														</div>
													</th>	
								</tr>
								)
								})
							}
							</tbody>
							<br></br><br></br>
						</table>
							</div>
					</div>
					<div>
					<div class="cogHlinkCont">
						<Link to="/cognhome"  class="cogHlink">
							<p className={`${activeTab==="CognHome" ? "active":""}`}  onClick={() => setActiveTab("CognHome")}>Another Test</p>
						</Link>
					</div>
				</div>
			</div>
		</div>
		</div>
)
}

export default View