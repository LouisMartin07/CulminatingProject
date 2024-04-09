import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

const Dashboard = () => {
  // adjust function to handle button click
  const handleButtonClick = (action) => {
    console.log(`Button clicked for ${action}`);
    // integrate functionality once rest of pages are setup!
  };

  return (
    <>
      <Container fluid className="mt-5"> {/* mt = margin-top & 4 is the scale from 0-5 rem  */}
        <header className="text-center mt-5 mb-4">
          <h1>Welcome to the Apiary Site</h1>
          <p>Introduction to the site and its features. Explore what you can do below.</p>
          <div className="d-flex justify-content-center mt-3">
            <Button
              variant="primary"
              className="mx-2"
              onClick={() => handleButtonClick('newVoiceMeme')}
            >
              Make a New Voice Memo
            </Button>
            <Button
              variant="secondary"
              className="mx-2"
              onClick={() => handleButtonClick('newMemo')}
            >
              Type a New Memo
            </Button>
          </div>
        </header>



        <Row className="mt-4"> 
          {/* create a function or state that fetches the next 3 calendar events */}
          {Array.from({ length: 3 }).map((_, index) => (
            <Col key={index} md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>{`Event ${index + 1}`}</Card.Title>
                  <Card.Text>
                    Details about the event. For instance, the event's date, time, and description.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>



        <footer className="text-center mt-5">
          <p>Connect with us on social media</p>
          <div>
            {/* choose what if any socials I want  */}
            <Button variant="link">Facebook</Button>
            <Button variant="link">Twitter</Button>
            <Button variant="link">Instagram</Button>
          </div>
          <div className="mt-3">
            <Button variant="outline-secondary" onClick={() => handleButtonClick('aboutTheAuthor')}>
              About the Author
            </Button>
            {/* possibly just describe indepth flow for devs and motivation behind the site?? */}
          </div>
        </footer>
      </Container>
    </>
  );
};

export default Dashboard;
