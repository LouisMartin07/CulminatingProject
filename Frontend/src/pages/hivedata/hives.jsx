import React, { useState, useEffect } from 'react';
import { createHive, getHives, deleteHive } from '../../utils/hivedata/hives';
import { Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Hives = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [hives, setHives] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedHiveId, setSelectedHiveId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadHives();
  }, []);

  const loadHives = async () => {
    const hivesData = await getHives();
    setHives(hivesData || []);
  };

  const handleCreateHive = async (e) => {
    e.preventDefault();
    const newHive = await createHive(name, location);
    if (newHive) {
      setName('');
      setLocation('');
      loadHives();
    }
  };

  const handleDeleteConfirmation = (hiveId) => {
    setSelectedHiveId(hiveId);
    setShowModal(true);
  };

  const handleDeleteHive = async () => {
    const success = await deleteHive(selectedHiveId);
    if (success) {
      loadHives();
      setShowModal(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-warning">Hive Management</h1>
      <Form onSubmit={handleCreateHive} className="mb-3">
        <Form.Group className="mb-3">
          <Form.Label>Hive Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter hive name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-dark text-white"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-dark text-white"
          />
        </Form.Group>
        <Button variant="outline-warning" type="submit">
          Create Hive
        </Button>
      </Form>
      <div>
        <h2 className="text-warning">Existing Hives</h2>
        {hives.map((hive) => (
          <div key={hive.id} className="mb-3 bg-dark text-white p-3 rounded">
            <span>{hive.name} - {hive.location}</span>
            <Button variant="secondary" onClick={() => navigate(`/hives/${hive.id}/slides`)} className="ms-2">
              Manage Slides
            </Button>
            <Button variant="danger" onClick={() => handleDeleteConfirmation(hive.id)} className="ms-2">
              Delete Hive
            </Button>
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Hive</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this hive?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteHive}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Hives;
