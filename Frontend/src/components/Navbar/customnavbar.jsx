import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const CustomNavbar = ({ setUser, user }) => {
  return (
    <Navbar bg="light" expand="lg" fixed={!user ? null : 'top'}>
      <Container>
        {user ? (
          // If user is authenticated
          <>
            <Navbar.Brand as={Link} to="/">AllTheBuzz or NewBee</Navbar.Brand>
            <Nav className="me-auto"> {/* Corrected to "me-auto" for Bootstrap 5 */}
              <Nav.Link as={Link} to="/signout">Sign Out</Nav.Link>
              <Nav.Link as={Link} to="/calendar">Go to Calendar</Nav.Link>
              <Nav.Link as={Link} to="/hivedata">Go to Hive Data</Nav.Link>
              <Nav.Link as={Link} to="/analytics">Go to Analytics</Nav.Link>
              <Nav.Link as={Link} to="/settings">Go to Settings</Nav.Link>
            </Nav>
          </>
        ) : (
          // If user is not authenticated
          <>
            <Navbar.Brand href="#home">AllTheBuzz or NewBee</Navbar.Brand> {/* Still need to decide on title */}
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
