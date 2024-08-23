import React,{Children} from "react";
import RootLayout from "./RootLayout";
import { Navigate,RouterProvider,createBrowserRouter } from 'react-router-dom';
import Main from './components/main/Main'
import Login from './components/login/Login'
import SignUp from "./components/signup/SignUp";
function App() {  
  const browserRouter = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      children: [
        
        {
          path: "login",
          element: <Login />
        },
        {
          path: "signup",
          element: <SignUp />
        },       
      
       
      ]
    }
  ])
  return (
    <RouterProvider router={browserRouter}>
      {Children}
    </RouterProvider>
  )
  
}
export default App;
