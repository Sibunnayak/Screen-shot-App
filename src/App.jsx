import "./App.css";
import React, { useState } from "react";

function App() {
  const [search, setsearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [flashapi, setflashapi] = useState(false);
  const [error, seterror] = useState(true);
  const [data, setdata] = useState({
    height: "",
    width: "",
    timestamp: "",
    cloudinaryurl: "",
    urll: "",
  });

  const date = new Date().toLocaleString();
  // API Keys for Flash Api

  const API_KEY = "59dbb814e5184409bb343880d2a7e4d8";
  const API_URL = `https://api.apiflash.com/v1/urltoimage?access_key=${API_KEY}&url=${search}&full_page="true"&fresh="true"`;

  // Fetching the ScreenShot from Flash Api

  const getScreenShot = async () => {
    setLoading(true);
    setflashapi(true);
    const res = await fetch(API_URL);
    // console.log(res);
    if (res.ok) {
      // console.log(res.url);
      saveImage(res.url);
    }
  };

  // Validating the Url and calling the Flash Api for ScreenShot

  const searchScreenShot = (e) => {
    e.preventDefault();
    var regexp =
      /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (search != "") {
      seterror(false);
      if (!regexp.test(search)) {
        alert("Please enter valid url.");
      } else {
        getScreenShot();
      }
    } else {
      alert("It seem you have not entered the url.");
      seterror(true);
    }
  };

  // Uploading the ScreenShot metadata to Cloudinary

  const saveImage = async (image) => {
    setflashapi(false);
    // console.log(image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "screenshot");
    data.append("cloud_name", "dom1snjrs");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dom1snjrs/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      // Fetching the ScreenShot metadata from Cloudinary

      const cloudData = await res.json();
      // console.log(cloudData);
      setdata({
        height: cloudData.height,
        width: cloudData.width,
        timestamp: cloudData.created_at,
        cloudinaryurl: cloudData.url,
        urll: search,
      });
      setLoading(false);
      setsearch("");
    } catch (error) {}
  };

  // Main UI
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
              autoFocus //for refresh the croser in input field
            />
            <button onClick={searchScreenShot}>Show ScreenShot</button>
          </div>
        </div>
      </nav>
      <div className="hero">
        {error ? (
          <h1 className="process">Enter the Url to get ScreenShot</h1>
        ) : !loading ? (
          <div className="container">
            {data.cloudinaryurl && (
              <a href={data.urll} target="_blank">
                <h2>Height : {data.height}</h2>
                <h2>Width : {data.width}</h2>
                <h2>Timestamp : {date}</h2>
                <img src={data.cloudinaryurl} alt="background" />
              </a>
            )}
          </div>
        ) : flashapi ? (
          <>
            <h2 className="process">
              Flash Api For ScreenShot is Processing...
            </h2>
            <div className="loading"></div>
          </>
        ) : (
          <>
            <h2 className="process">Cloudinary is Processing...</h2>
            <div className="loading"></div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
