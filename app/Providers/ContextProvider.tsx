"use client"

import React, { useEffect, useState } from "react"
import { GlobalContextProvider } from "../Context/GlobalContextProvider";
import { Toaster } from "react-hot-toast";

interface props {
  children: React.ReactNode
}

const ContextProvider = ({ children }: props) => {

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    },1000);
  },[]);

  if(!isReady){
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  return (
  <GlobalContextProvider>
    <Toaster/>
    {children}
  </GlobalContextProvider>)
}

export default ContextProvider