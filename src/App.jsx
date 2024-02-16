
import "./App.css";
import React, { useState, useEffect } from 'react';

function App() {

  const [image, setImage] = useState('');
  const [urll, setUrl] = useState('');
  const [search, setsearch] = useState("");
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [data,setdata] = useState({height:"",width:"",timestamp:""});
const API_KEY="dce52188456e4b10978f09ba67d2f9ad"
const API_URL=`https://api.apiflash.com/v1/urltoimage?access_key=${API_KEY}&url=${search}&full_page="true"&fresh="true"`;



const getScreenShot = async () => {
  setLoading(true);
    const res = await fetch(API_URL);
    console.log(res);
    if(res.ok){
      console.log(res.url);
      setImage(res.url);
    setLoading(false);
}
}

const searchScreenShot =  (e) => {
  e.preventDefault();
  getScreenShot();
    setsearch('');
    setUrl('');
};



const saveImage = async () => {
  // setImage(search);
  console.log(image);
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "screenshot");
  data.append("cloud_name", "dom1snjrs");

  try {
    if(image === null){
      return toast.error("Please Upload image")
    }

    const res = await fetch('https://api.cloudinary.com/v1_1/dom1snjrs/image/upload',{
      method : "POST",
      body : data
    })

    const cloudData = await res.json();
    setUrl(cloudData.url);
    console.log(cloudData);
    setdata({height:cloudData.height,width:cloudData.width,timestamp:cloudData.created_at});
    setImage('');
    toast.success("Image Upload Successfully")
  } catch (error) {
    
  }
}

  return (
    <div className="App">
       <nav>
         <div className="container">
           <div className="logo"> 
   
            <input
              type="text"
              placeholder="Enter the Url Here..."
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              // onChange={(e) => setImage(e.target.value)} 
              autoFocus //for refresh the croser in input field
            />
            <button 
            onClick={searchScreenShot}
             >Take ScreenShot</button>
             <button onClick={saveImage}>show Image</button>
          </div>
          
        </div>
      </nav>
      <div className="hero">
        {!loading  ? (
          <div className="container">
            {urll && (
              <a href={urll} target="_blank">
                <h2>Height : {data.height}</h2>
                <h2>Width : {data.width}</h2>
                <h2>Timestamp : {data.timestamp}</h2>
                <img src={urll} alt="background" />
              </a>
            )}
          </div>
        ) : <>
           <h2>wait few minutes while loading is over then click the show image </h2>
          <div className="loading"></div>
        </>}
      </div>
    </div>
  );

}

export default App;
