import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/Navbar/customnavbar';
import { Outlet, useLoaderData } from 'react-router-dom';
import { useState, useEffect } from "react";

function App() {
  const loaderData = useLoaderData();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (loaderData) {
      setUser(loaderData); 
    }
  }, [loaderData]);

  return (
    <>
      <CustomNavbar setUser={setUser} user={user} />
      <Outlet context={{ user, setUser }} />
    </>
  );
}

export default App;
