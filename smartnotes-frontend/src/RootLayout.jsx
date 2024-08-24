import React from "react";
import {Outlet} from 'react-router-dom'
import Main from "./components/main/Main";

function RootLayout(){
    return (
        <div>
        <Main />
        <div  style={{minHeight:"0vh"}} className='container'> 
              <Outlet />
        </div>
       </div>
    )
}
export default RootLayout;