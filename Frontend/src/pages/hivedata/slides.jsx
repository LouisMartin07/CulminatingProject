import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSlides, createSlide, updateSlide, deleteSlide } from '../../utils/hivedata/slides';
import { Form, Button, Table, Alert, Modal } from 'react-bootstrap';

const Slides = () => {
  const { hiveId } = useParams();
  const navigate = useNavigate();
  const [slides, setSlides] = useState([]);
  const [slide_number, setSlideNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [editingSlide, setEditingSlide] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedSlideId, setSelectedSlideId] = useState(null);

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

  const handleDeleteConfirmation = (slideId) => {
    setSelectedSlideId(slideId);
    setShowModal(true);
  };

  const handleDeleteSlide = async () => {
    const result = await deleteSlide(hiveId, selectedSlideId);
    if (result.success) {
      loadSlides();
      setShowModal(false);
    } else {
      setError(`Failed to delete slide: ${result.message}`);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-warning">Slide Management for Hive {hiveId}</h1>
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
              className="bg-dark text-white"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={editingSlide.notes}
              onChange={(e) => setEditingSlide({ ...editingSlide, notes: e.target.value })}
              className="bg-dark text-white"
            />
          </Form.Group>
          <Button variant="outline-warning" type="submit">Update Slide</Button>
          <Button variant="outline-secondary" onClick={() => setEditingSlide(null)}>Cancel</Button>
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
              className="bg-dark text-white"
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
              className="bg-dark text-white"
            />
          </Form.Group>
          <Button variant="outline-warning" type="submit">Add Slide</Button>
        </Form>
      )}
      <Table striped bordered hover variant="dark" className="mt-3 text-warning">
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
                <Button variant="outline-secondary" onClick={() => setEditingSlide(slide)}>
                  Edit
                </Button>
                <Button variant="outline-danger" onClick={() => handleDeleteConfirmation(slide.id)}>
                  Delete
                </Button>
                <Button variant="outline-info" onClick={() => navigate(`/hives/${hiveId}/slides/${slide.id}/bees`)}>
                  Manage Bees
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Slide</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this slide?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteSlide}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Slides;
