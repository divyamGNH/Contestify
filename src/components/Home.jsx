import React from "react";
import axios from "axios";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    axios.get("http://localhost:3000/api/getPlatformData/getPersonalPlatforms")
    .then((res)=>{
      const data = res.data;
      console.log("Selected platforms are: ", res.data);
    })
  }, []);
  return <div></div>;
};

export default Home;
