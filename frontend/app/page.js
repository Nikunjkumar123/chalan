"use client";
import { useContext, useEffect } from "react";
import Auth from "./auth/page";
import { AuthContext } from "./component/context/AuthContext.js";
import ViewChallan from "./component/challan/challan.js";

export default function Home() {
  const { token } = useContext(AuthContext);
  
  return (
    <div className="flex flex-1 justify-center bg-white">
      {token && (
       
        <ViewChallan/>
      ) }
    </div>
  );
}
