import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap'; 
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { userLogOut } from '../../utils/account';

const CustomNavbar = ({ setUser, user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // This function handles the logout process
  const handleLogOut = async () => {
    await userLogOut(); // Call the logout function
    setUser(null); // Update the state to reflect that the user is no longer signed in
    navigate('/'); // Home page redirect
  };

  // Custom handler for the Home link
  const handleHomeClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior

    if (location.pathname === '/') {
      // User is already on the home page, scroll to top
      window.scrollTo(0, 0);
    } else {
      // User is not on the home page, navigate to home
      navigate('/');
    }
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        {user ? ( // conditionally display a different NavBar based on user signed on state
          <>
            <Navbar.Brand as={Link} to="/">AllTheBuzz or NewBee</Navbar.Brand> {/* see if whole class will vote on name when presenting project*/}
            <Nav className="me-auto">
              <Button variant="outline-primary" onClick={handleLogOut}>Sign Out</Button>
              <Nav.Link as={Link} to="/calendar">Go to Calendar</Nav.Link>
              <Nav.Link as={Link} to="/hives">Go to Hive Data</Nav.Link>
              <Nav.Link as={Link} to="/analytics">Go to Analytics</Nav.Link>
              <Nav.Link as={Link} to="/settings">Go to Settings</Nav.Link>
            </Nav>
          </>
        ) : (
          <>
            <Navbar.Brand href="#home">AllTheBuzz or NewBee</Navbar.Brand> {/* see if whole class will vote on name when presenting project*/}
            <Nav className="me-auto">
              <Nav.Link href="#home" onClick={handleHomeClick}>Home</Nav.Link>
              <Nav.Link as={Link} to="/login">Login/Signup</Nav.Link>
            </Nav>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
