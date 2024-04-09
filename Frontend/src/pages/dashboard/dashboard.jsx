import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DashboardNavbar from '../components/Navbar';

const Dashboard = () => {
  return (
    <>
      <DashboardNavbar />
      <Container fluid className="mt-5">
        <header>
          <h1 className="text-center mt-5">Dashboard Header</h1>
          {/* Placeholder for header content */}
        </header>
        <Row className="mt-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Col key={index} md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>{`Card ${index + 1}`}</Card.Title>
                  <Card.Text>
                    This is some text within a card body.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <footer>
          {/* Placeholder for footer content */}
        </footer>
      </Container>
    </>
  );
};

export default Dashboard;

