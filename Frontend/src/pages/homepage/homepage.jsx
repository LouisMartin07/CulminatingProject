import React from 'react';
import { Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import image1 from '../../assets/images/bee.webp';
import image2 from '../../assets/images/voice2txt.webp';
import image3 from '../../assets/images/analytic.webp';

const HomePage = () => {
  const imageStyle = {
    height: '100vh', // sets max height
    objectFit: 'cover', // img covers area without stretching it
    width: '100%', // sets max width
  };
  
  // takes each img and maps the text to it (have 3 imgs need a 4th or get rid of 4)
  // fix text so its more visible and looks nice

  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#home">AllTheBuzz or NewBee </Navbar.Brand> {/* pick between website titles */}
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link as={Link} to="/login">Login/Signup</Nav.Link> {/* Use Link to navigate (currently does nothing */}
          </Nav>
        </Container>
      </Navbar>

    <Container fluid>
      {[image1, image2, image3, image3].map((image, index) => (
        <Row key={index} className="mb-5">
          <Col>
            <Card className="bg-dark text-white text-center">
              <Card.Img src={image} alt={`Feature ${index + 1}`} style={imageStyle} />
              <Card.ImgOverlay className="d-flex flex-column justify-content-center">
                <Card.Title>{`Feature ${index + 1}`}</Card.Title>
                <Card.Text>
                  {`This section is about Feature ${index + 1}. Add your descriptive text here to explain the feature.`}
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
    </>
  );
};

export default HomePage;

