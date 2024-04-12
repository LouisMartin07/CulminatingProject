import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSlides, createSlide, deleteSlide } from '../../utils/slides';
import { Form, Button, Table, Alert } from 'react-bootstrap';

const Slides = () => {
  const { hiveId } = useParams();
  const [slides, setSlides] = useState([]);
  const [slideNumber, setSlideNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadSlides();
  }, [hiveId]);

  const loadSlides = async () => {
    const slidesData = await getSlides(hiveId);
    if (slidesData) {
      setSlides(slidesData);
    } else {
      setError('Failed to load slides.');
    }
  };

  const handleAddSlide = async (e) => {
    e.preventDefault();
    const newSlide = await createSlide(hiveId, slideNumber, notes);
    if (newSlide) {
      setSlideNumber('');
      setNotes('');
      loadSlides();  // Reload the list of slides after adding a new one
    } else {
      setError('Failed to add slide.');
    }
  };

  const handleDeleteSlide = async (slideId) => {
    const success = await deleteSlide(slideId);
    if (success) {
      loadSlides();
    } else {
      setError('Failed to delete slide.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Slide Management for Hive {hiveId}</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleAddSlide}>
        <Form.Group className="mb-3">
          <Form.Label>Slide Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter slide number"
            value={slideNumber}
            onChange={(e) => setSlideNumber(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Enter any notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Slide
        </Button>
      </Form>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Slide Number</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {slides.map((slide) => (
            <tr key={slide.id}>
              <td>{slide.slideNumber}</td>
              <td>{slide.notes}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteSlide(slide.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Slides;
