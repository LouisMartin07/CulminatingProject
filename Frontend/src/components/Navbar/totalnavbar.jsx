import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// use a context or a state management solution to check if a user is authenticated
// should be integrated in the app.jsx
const isLoggedIn = () => {
  // Implement the logic to determine if the user is logged in
  // maybe check for a user token in local storage:
};

const CustomNavbar = () => {
  const userLoggedIn = isLoggedIn();

  return (
    <Navbar bg="light" expand="lg" fixed={userLoggedIn ? null : 'top'}>
      <Container>
        {userLoggedIn ? (
          <>
            <Navbar.Brand as={Link} to="/">AllTheBuzz or NewBee</Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/signout">Sign Out</Nav.Link>
              <Nav.Link as={Link} to="/calendar">Go to Calendar</Nav.Link>
              <Nav.Link as={Link} to="/hivedata">Go to Hive Data</Nav.Link>
              <Nav.Link as={Link} to="/analytics">Go to Analytics</Nav.Link>
              <Nav.Link as={Link} to="/settings">Go to Settings</Nav.Link>
            </Nav>
          </>
        ) : (
          <>
            <Navbar.Brand href="#home">AllTheBuzz or NewBee</Navbar.Brand> {/* still need to decide on title */}
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link as={Link} to="/login">Login/Signup</Nav.Link>
            </Nav>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
