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

  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.45)', 
    color: '#fff',
    padding: '20px',
    height: '100%', 
  };

  const containerStyle = {
    backgroundColor: '#000', 
    padding: 0, 
    margin: 0 
  };

  // Define the text for each image
  const descriptions = [
    {
      title: 'Take Control of Your Apiary',
      text: 'There are many factors you can’t control, but managing your data shouldn’t be one of them. Our platform offers unmatched data management tools, making it superior to other apiary apps. Here, you control what matters.'
    },
    {
      title: 'Features for All Skill Levels',
      text: 'Whether you’re a novice or an expert, we have something for everyone. From basic resources like calendars and data tables to advanced analytics and graphs on environmental impacts, our tools help you manage your apiary effectively.'
    },
    {
      title: 'Future of Hive Management',
      text: 'Imagine more advanced analytics and the ability to upload pictures of your slides. Our future AI will analyze these images and provide a detailed health report, removing the guesswork from hive maintenance.'
    }
  ];

  return (
    <>
      <Container fluid style={containerStyle}>
        {[image1, image2, image3].map((image, index) => (
          <Row key={index} className="mb-5">
            <Col>
              <Card className="text-white text-center">
                <Card.Img src={image} alt={`Feature ${index + 1}`} style={imageStyle} />
                <Card.ImgOverlay style={overlayStyle} className="d-flex flex-column justify-content-center">
                  <Card.Title>{descriptions[index].title}</Card.Title>
                  <Card.Text>
                    {descriptions[index].text}
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
