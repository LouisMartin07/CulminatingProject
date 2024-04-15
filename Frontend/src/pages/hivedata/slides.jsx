import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSlides, createSlide, updateSlide, deleteSlide } from '../../utils/slides';
import { Form, Button, Table, Alert } from 'react-bootstrap';

const Slides = () => {
  const { hiveId } = useParams();
  const navigate = useNavigate();
  const [slides, setSlides] = useState([]);
  const [slide_number, setSlideNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [editingSlide, setEditingSlide] = useState(null);
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
    const newSlide = await createSlide(hiveId, slide_number, notes);
    if (newSlide) {
      setSlideNumber('');
      setNotes('');
      loadSlides();
    } else {
      setError('Failed to add slide.');
    }
  };

  const handleEditSlide = (slide) => {
    setEditingSlide({ ...slide });
  };

  const handleUpdateSlide = async (e) => {
    e.preventDefault();
    const updatedSlide = await updateSlide(hiveId, editingSlide.id, { slide_number: editingSlide.slide_number, notes: editingSlide.notes });
    if (updatedSlide) {
      loadSlides();
      setEditingSlide(null);
    } else {
      setError('Failed to update slide.');
    }
  };

  const handleDeleteSlide = async (slideId) => {
    if (window.confirm("Are you sure you want to delete this slide?")) {
      const result = await deleteSlide(hiveId, slideId);
      if (result.success === false) {
        setError(`Failed to delete slide: ${result.message}`);
      } else {
        loadSlides();
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1>Slide Management for Hive {hiveId}</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {editingSlide ? (
        <Form onSubmit={handleUpdateSlide}>
          <Form.Group className="mb-3">
            <Form.Label>Slide Number</Form.Label>
            <Form.Control
              type="number"
              value={editingSlide.slide_number}
              onChange={(e) => setEditingSlide({ ...editingSlide, slide_number: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={editingSlide.notes}
              onChange={(e) => setEditingSlide({ ...editingSlide, notes: e.target.value })}
            />
          </Form.Group>
          <Button variant="primary" type="submit">Update Slide</Button>
          <Button variant="secondary" onClick={() => setEditingSlide(null)}>Cancel</Button>
        </Form>
      ) : (
        <Form onSubmit={handleAddSlide}>
          <Form.Group className="mb-3">
            <Form.Label>Slide Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter slide number"
              value={slide_number}
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
          <Button variant="primary" type="submit">Add Slide</Button>
        </Form>
      )}
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
              <td>{slide.slide_number}</td>
              <td>{slide.notes}</td>
              <td>
                <Button variant="secondary" onClick={() => handleEditSlide(slide)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteSlide(slide.id)}>
                  Delete
                </Button>
                <Button variant="info" onClick={() => navigate(`/hives/${hiveId}/slides/${slide.id}/bees`)}>
                  Manage Bees
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
