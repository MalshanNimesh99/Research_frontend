import React,{useState,Component,useEffect} from 'react'
import {Link} from "react-router-dom";
import axios from "axios";
import Header from '../components/Header.js';
import '../css/main.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

    function handleFileChange(event) {
      setSelectedImage(event.target.files[0]);
      setSelectedFile(event.target.files[0]);
    }
  
      
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);
    fetch('http://127.0.0.1:5000/predictBrainTumor', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      setResult(data.result);
      console.log(data.result);
    })
    .catch(error => {
      console.error(error);
    });
  }
  
    return (
      <div>
        <Header />
        <div class="btContainer">
          <h3>Select Brain MRI Image</h3>
          <br></br>
          <form onSubmit={handleSubmit}>
            <input class="fileinput" type="file" onChange={handleFileChange} />
            <button class="btn btn-outline-primary btn-lg" type="submit">Submit</button>
          </form>
          <br></br> 
          {selectedImage && (
            <img id="selected-image" class="inputimage" src={URL.createObjectURL(selectedImage)} alt="Selected" />)}
          <br></br><br></br>
          <div class="container text-center">
            <div class="row align-items-center">
              <div class="col">
                <p class="para">Prediction : {result && <p>{result}</p>}</p>
              </div>
            </div>
          </div>
        </div> <br></br>
      </div>
    );
};
  
export default App;