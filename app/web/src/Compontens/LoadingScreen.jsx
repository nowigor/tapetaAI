import React, { useState} from "react";
import { useEffect } from "react";
import loadingGif from "../assets/loading.gif";

const LoadingScreen = () => {

return (
    <div className="">
      <img src={loadingGif}></img>
    </div>
     
  );
};

export default LoadingScreen;
