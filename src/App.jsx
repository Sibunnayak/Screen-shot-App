
import "./App.css";
import React, { useState, useEffect } from 'react';

function App() {

  // const [image, setImage] = useState('');
  const [urll, setUrl] = useState('');
  const [search, setsearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [apii, setapii] = useState(false);
  // const[cloud,setcloud]=useState(false);
  const [data,setdata] = useState({height:"",width:"",timestamp:""});
const API_KEY="3ffd3c75fbcd4be6b068ca6d828ae6fb"
const API_URL=`https://api.apiflash.com/v1/urltoimage?access_key=${API_KEY}&url=${search}&full_page="true"&fresh="true"`;



const getScreenShot = async () => {
  setLoading(true);
  setapii(true);
    const res = await fetch(API_URL);
    console.log(res);
    if(res.ok){
      console.log(res.url);
      // setImage(res.url);
      
      saveImage(res.url);
    
}
// callback();
}

const searchScreenShot =  (e) => {
  e.preventDefault();
  getScreenShot();
  // getScreenShot(saveImage);
    setsearch('');
    // setUrl('');
};

//  function searchScreenShot(e,callback) {
//   e.preventDefault();
//    getScreenShot();   
//     setTimeout(function() {
//       setsearch('');
//     callback();
//     }, 3000);
// }


const saveImage = async (image) => {
  // setImage(search);
  setapii(false);
  // setcloud(true);
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
    // setImage('');
    // setcloud(false);
    setLoading(false);
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
            // onClick={(e)=>searchScreenShot(e,saveImage)}
             >Show ScreenShot</button>
             {/* <button onClick={saveImage}>show Image</button> */}
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
        ) : apii ? (
          <>
          <h2 className="process">
            Flash Api For ScreenShot is Processing...
          </h2>
          <div className="loading"></div>
          </>
        ) : (<>
        <h2 className="process">
          Cloudinary is Processing...
        </h2>
           <div className="loading"></div>
           </>
           )}
      </div>
    </div>
  );

}

export default App;
