import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import image1 from '../../assets/images/bee.webp';
import image2 from '../../assets/images/voice2txt.webp';
import image3 from '../../assets/images/analytic.webp';

const HomePage = () => {
  const imageStyle = {
    height: '100vh',
    objectFit: 'cover',
    width: '100%',
  };

  // adding an overlay(image more translucent) to make text more visible 
  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.45)', 
    color: '#fff',
    padding: '20px',
    height: '100%', 
  };

  // Style to make the surrounding whitespace black
  const containerStyle = {
    backgroundColor: '#000', 
    padding: 0, 
    margin: 0 
  };

  return (
    <>
      <Container fluid style={containerStyle}>
        {[image1, image2, image3].map((image, index) => (
          <Row key={index} className="mb-5">
            <Col>
              <Card className="text-white text-center">
                <Card.Img src={image} alt={`Feature ${index + 1}`} style={imageStyle} />
                <Card.ImgOverlay style={overlayStyle} className="d-flex flex-column justify-content-center">
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
