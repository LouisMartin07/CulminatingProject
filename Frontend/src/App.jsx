import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/Navbar/customnavbar';
import { Outlet, useLoaderData } from 'react-router-dom';
import { useState } from "react";

function App() {
  // Initialize user state as null until valid user is logged in
  const [user, setUser] = useState(useLoaderData);

  return (
    <>
    <CustomNavbar setUser ={setUser} user={user} />
    <Outlet context= {{ user, setUser}} />
    </>
  )
}

export default App
