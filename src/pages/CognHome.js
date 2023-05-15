import React,{useState,Component,useEffect} from 'react'
import {Link,useNavigate,useLocation} from "react-router-dom";
import axios from "axios";
import Header from '../components/Header.js';
import '../css/main.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const initialState = {
	image:" ",
};

const CognHome = () =>{

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

	const navigate = useNavigate();
	const [option,setOption] = useState()

	const [data, setdata] = useState({ msg: ""});	

	function handleChange(event){
	    setOption(event.target.value)
	}

	function getDateOnly(date) {
    	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	}


	const onFormSubmitCKD=(event) =>{

		const addPrediction = async(sendData) =>{

		    const response=await axios.post("http://localhost:5001/healthprediction",sendData)
		    if (response.status===200){
		        // navigate('/sign-in');        
		    }else{
		        alert("Error response")
		    }
		}

		event.preventDefault();

		  const Symptom_1 = event.target.symptom1.value;
		  const Symptom_2 = event.target.symptom2.value;
		  const Symptom_3 = event.target.symptom3.value;
		  const Symptom_4 = event.target.symptom4.value;
		  const Symptom_5 = event.target.symptom5.value;
		  const Symptom_6 = event.target.symptom6.value;
		  const Symptom_7 = event.target.symptom7.value;
		  const Symptom_8 = event.target.symptom8.value;
		  


		  const sendData = {
		    "Symptom_1": Symptom_1,
		    "Symptom_2": Symptom_2,
		    "Symptom_3": Symptom_3,
		    "Symptom_4": Symptom_4,
		    "Symptom_5": Symptom_5,
		    "Symptom_6": Symptom_6,
		    "Symptom_7": Symptom_7,
		    "Symptom_8": Symptom_8
		    
		  }
		  
		  console.log(sendData)
		  axios.post("http://localhost:5000/ckd", sendData).then(result => {

	        const data = result.data
	        const userData = JSON.parse(sessionStorage.getItem("activeuser"));
	        const type = "CKD";
	        var date = new Date();
	        date=getDateOnly(date)
	        var prediction=data.msg
	        var cdr=0;
	        var final_result= data.prd


	        if(prediction[1]==='0'){
	        	prediction="CDR  Score is 0";
	        	var cdr=0;
	        }
	        else if(prediction[1]==='1'){
	        	prediction="CDR Score is 0.5";
	        	var cdr=1;
	        }
	        else{
	        	prediction="CDR Score is 1";
	        	var cdr=2;	        
	    	}

	    	if(final_result[1]==='0'){
	        	final_result="Dementia Group is Non Demented";
	        }
	        else if(final_result[1]==='1'){
	        	final_result="Dementia Group is Demented";
	        }
	        else{
	        	final_result="Dementia Group is Converted";       
	    	}

	        const predictions={
	        	"user":userData.id,
	        	"type":type,
	        	"date":date,
	        	"prediction":prediction
	        }
	        
	        addPrediction(predictions)

	        const end_result={
	        	"prediction":prediction
	        }
	        
	        const sendData = {
			    "Symptom_1": Symptom_1,
			    "Symptom_2": Symptom_2,
			    "Symptom_3": Symptom_3,
			    "Symptom_4": Symptom_4,
			    "Symptom_5": Symptom_5,
			    "Symptom_6": Symptom_6,
			    "Symptom_7": Symptom_7,
			    "Symptom_8": Symptom_8,
			    "CDR":prediction,
			    "Final_result":final_result
			    
			  }

	        window.sessionStorage.setItem('common_submit', JSON.stringify(sendData));
	        window.sessionStorage.setItem('common_result', JSON.stringify(end_result));

	        setdata({
                    name: data.msg
                });

	        navigate('/n_ckd');
	        
	      })

	}

	



	return(
	<div> 
		<Header />
		<div class="btContainerlong">
		<div class="container text-center">
			<div class="row align-items-start">
    			<div class="col-8" className="handledivHome">
					<form onSubmit={ onFormSubmitCKD }>
		              	<div className="mb-3">	
							<h4>Enter Below Details</h4>
							<br></br>
							<label style={{float:"left"}}>Gender</label>
							<select className="form-control"  name='symptom1' >
								<option value="1">Male</option>
								<option value="0">Female</option>
							</select>
							<br></br>
							<label style={{float:"left"}}>Age</label>
							<input type="text" className="form-control" placeholder="Age"  onChange={handleChange} name="symptom2" />
							<br></br>
							<label style={{float:"left"}}>Education Year</label>
							<input type="text" className="form-control" placeholder="Education year"  onChange={handleChange} name="symptom3" />
							<br></br>
							<label style={{float:"left"}}>Social Economical State</label>
							<input type="text" className="form-control" placeholder="Social Economical State"  onChange={handleChange} name="symptom4" />
							<br></br>
							<label  style={{float:"left"}}>MMSE Score</label>
							<input type="text" className="form-control" placeholder="MMSE Score"  onChange={handleChange} name="symptom5" />
							<br></br>
							<label style={{float:"left"}}>ETIV Value</label>
							<input type="text" className="form-control" placeholder="ETIV Value"  onChange={handleChange} name="symptom6" />
							<br></br>
							<label style={{float:"left"}}>NWBV Value</label>
							<input type="text" className="form-control" placeholder="NWBV Value"  onChange={handleChange} name="symptom7" />
							<br></br>
							<label style={{float:"left"}}>ASF Value</label>
							<input type="text" className="form-control" placeholder="ASF Value"  onChange={handleChange} name="symptom8" />
							<br></br>
							</div>
		              <div>
			          <button type="submit" className="btn btn-primary">
			            Submit
			          </button>
			        </div>
		        </form>
	        	</div>
				<div>
					<div class="cogHlinkCont">
						<Link class="cogHlink" to={`/history/${user.id}`}>
							<p className={`${activeTab==="Adduser" ? "active":""}`} onClick={() => setActiveTab("History")} >History</p>
						</Link>
						<br></br>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
)
		
}

export default CognHome