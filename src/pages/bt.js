import React,{useState,Component,useEffect} from 'react'
import {Link} from "react-router-dom";
import axios from "axios";
import Header from '../components/Header.js';
import '../css/main.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [prediction, setPrediction] = useState('');
    const [accuracy, setAccuracy] = useState('');
  
    const handleImageChange = (e) => {
      setSelectedImage(e.target.files[0]);
      setPrediction('');
      setAccuracy('');
    };
  
    const handlePredictClick = () => {
      if (selectedImage) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Image = e.target.result.split(',')[1];
          const message = {
            image: base64Image,
          };
          axios.post('http://127.0.0.1:5000/predict', JSON.stringify(message))
            .then(response => {
              setPrediction(response.data.Prediction.result);
              setAccuracy(response.data.Prediction.accuracy.toFixed(2));
            })
            .catch(error => {
              console.error(error);
            });
        };
        reader.readAsDataURL(selectedImage);
      }
    };
  
    return (
      <div>
        <Header />
        <div class="btContainer">
          <h3>Select Brain MRI Image</h3>
          <br></br>
          <input id="image-selector" class="fileinput" type="file" onChange={handleImageChange} />

          <button id="predict-button" class="btn btn-outline-primary btn-lg" onClick={handlePredictClick}>Predict</button>
          <br></br> <br></br>
          {selectedImage && (
            <img id="selected-image" class="inputimage" src={URL.createObjectURL(selectedImage)} alt="Selected" />
          )}
          <br></br> <br></br>
          <div class="container text-center">
            <div class="row align-items-center">
              <div class="col">
                <p class="para">Prediction : <span id="result">{prediction}</span></p>
                {/* <p>Accuracy : <span id="probability">{accuracy}</span></p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default App;