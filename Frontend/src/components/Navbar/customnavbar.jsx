import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaCalendarAlt, FaChartLine, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { userLogOut } from '../../utils/account';

const CustomNavbar = ({ setUser, user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = async () => {
    await userLogOut();
    setUser(null);
    navigate('/');
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/dashboard'); // Navigate to dashboard if user is signed in
    } else if (location.pathname === '/') {
      window.scrollTo(0, 0); // Scroll to top if already on home page
    } else {
      navigate('/'); // Navigate to home if not signed in and not on home page
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" style={{ boxShadow: '0 4px 6px rgba(0,0,0,.1)' }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ fontWeight: 'bold', color: 'orange' }}>
          AllTheBuzz or NewBee
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          <Nav className="justify-content-center flex-grow-1 pe-3">
            {user ? (
              <>
                <Nav.Link as={Link} to="/calendar"><FaCalendarAlt /> Calendar</Nav.Link>
                <Nav.Link as={Link} to="/hives"><FaChartLine /> Hive Data</Nav.Link>
                <Nav.Link href="#home" onClick={handleHomeClick}><FaHome /> Home</Nav.Link>
                <Nav.Link as={Link} to="/analytics"><FaChartLine /> Analytics</Nav.Link>
                <NavDropdown title={<span><FaCog /> Settings</span>} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/settings">Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogOut}><FaSignOutAlt /> Sign Out</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="#home" onClick={handleHomeClick}><FaHome /> Home</Nav.Link>
                <Nav.Link as={Link} to="/login"><FaSignInAlt /> Login/Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
