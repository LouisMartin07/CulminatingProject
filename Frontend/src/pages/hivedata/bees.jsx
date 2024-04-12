import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBees, createBee, updateBeeQuantity, deleteBee } from '../../utils/bees';
import { Form, Button, Table } from 'react-bootstrap';

const Bees = () => {
  const { slideId } = useParams();
  const [bees, setBees] = useState([]);
  const [role, setRole] = useState('worker');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadBees();
  }, [slideId]);

  const loadBees = async () => {
    const beesData = await getBees(slideId);
    setBees(beesData || []);
  };

  const handleAddBee = async (e) => {
    e.preventDefault();
    const newBee = await createBee(slideId, { role, quantity });
    if (newBee) {
      loadBees();  // Reload the list of bees after adding a new one
    }
  };

  return (
    <div className="container mt-5">
      <h1>Bees Management for Slide {slideId}</h1>
      <Form onSubmit={handleAddBee}>
        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="queen">Queen</option>
            <option value="worker">Worker</option>
            <option value="guard">Guard</option>
            <option value="larva">Larva</option>
            <option value="mite">Mite</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Bee
        </Button>
      </Form>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Role</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bees.map((bee) => (
            <tr key={bee.id}>
              <td>{bee.role}</td>
              <td>{bee.quantity}</td>
              <td>
                <Button variant="info" onClick={() => updateBeeQuantity(bee.id, bee.quantity + 1).then(loadBees)}>
                  Increase
                </Button>
                {' '}
                <Button variant="warning" onClick={() => updateBeeQuantity(bee.id, bee.quantity - 1).then(loadBees)} disabled={bee.quantity === 1}>
                  Decrease
                </Button>
                {' '}
                <Button variant="danger" onClick={() => deleteBee(bee.id).then(loadBees)}>
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

export default Bees;
