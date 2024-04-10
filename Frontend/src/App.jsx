import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import { useState } from "react";
import CustomNavbar from './components/Navbar/customnavbar';

function App() {
  // Initialize user state as null until valid user is logged in
  const [user, setUser] = useState(null);

  return (
    <>
    <CustomNavbar setUser ={setUser} user={user} />
    <Outlet context= {{ user, setUser}} />
    </>
  )
}

export default App
