import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DashboardNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">BeeKeepPro</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/signout">Sign Out</Nav.Link>
          <Nav.Link as={Link} to="/calendar">Go to Calendar</Nav.Link>
          <Nav.Link as={Link} to="/hivedata">Go to Hive Data</Nav.Link>
          <Nav.Link as={Link} to="/analytics">Go to Analytics</Nav.Link>
          <Nav.Link as={Link} to="/settings">Go to Settings</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default DashboardNavbar;