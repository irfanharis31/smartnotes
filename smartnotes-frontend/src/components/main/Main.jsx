import React from 'react'
import { Link } from "react-router-dom";

function Main() {
  return (
    <div>
    <div className="flex flex-wrap justify-between  ">
    <h1 className="mt-3  mx-5">
      SmartNotes
    </h1>
    <ul className=" flex p-3  ">
         <li className="px-3">
        <Link to="signup" className=" text-dark">
         
          Signup
        </Link>
      </li>      
        <li className="">
          <Link to="login" className=" text-black">
           
            Login
          </Link>
       </li>
        
    </ul>
  </div>
  </div>
    
  )
}

export default Main