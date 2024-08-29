import React from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './components/main/Main';
import ProfileLayout from "./user-profile/ProfileLayout";
import Home from "./user-profile/Home";
import Favourites from "./user-profile/Favourites";
import Notes from "./user-profile/Notes";
import NoteDetail from "./user-profile/NoteDetail"; 
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Tags from "./user-profile/Tags";
import Trash from "./user-profile/Trash";
import SearchBar from "./user-profile/SearchBar";

function App() {  
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Main />, 
    },
    {
      path: "/profile",
      element: <ProfileLayout />,
      children: [
        { path: "", element: <Home /> },
        { path: "searchbar", element: <SearchBar /> },
        { path: "favourites", element: <Favourites /> },
        { path: "notes", element: <Notes />,
          children: [
            { path: ':noteId', element: <NoteDetail /> },
          ]
         },
         { path: "tags", element: <Tags /> },
         { path: "trash", element: <Trash /> },
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    }
  ]);

  return (
    <RouterProvider router={browserRouter} />
  );
}

export default App;
