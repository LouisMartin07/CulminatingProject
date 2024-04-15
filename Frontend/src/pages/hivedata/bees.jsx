import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBees, createBee, updateBeeQuantity, deleteBee } from '../../utils/bees';
import { Form, Button, Table, Alert } from 'react-bootstrap';

const Bees = () => {
    const { hiveId, slideId } = useParams(); // Extract both hiveId and slideId from URL parameters
    const [bees, setBees] = useState([]);
    const [role, setRole] = useState('worker');
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState('');

    useEffect(() => {
        loadBees();
    }, [hiveId, slideId]); // Reload bees whenever hiveId or slideId changes

    const loadBees = async () => {
        const beesData = await getBees(hiveId, slideId);
        if (beesData) setBees(beesData);
        else setError('Failed to load bees.');
    };

    const handleAddBee = async (e) => {
        e.preventDefault();
        const newBee = await createBee(hiveId, slideId, { role, quantity });
        if (newBee) {
            setRole('worker'); // Reset form to default values after successful creation
            setQuantity(1);
            loadBees(); // Reload bees to reflect the new addition
        } else {
            setError('Failed to add bee.');
        }
    };

    const handleUpdateBee = async (beeId, newQuantity) => {
        const success = await updateBeeQuantity(hiveId, slideId, beeId, newQuantity);
        if (success) {
            loadBees(); // Reload bees to reflect the quantity update
        } else {
            setError('Failed to update bee quantity.');
        }
    };

    const handleDeleteBee = async (beeId) => {
        try {
            const success = await deleteBee(hiveId, slideId, beeId);
            if (success) {
                await loadBees(); // Ensure bees are reloaded after deletion
            } else {
                throw new Error('Deletion failed at the backend.');
            }
        } catch (error) {
            setError(error.message || 'Failed to delete bee.');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Bees Management for Slide {slideId} in Hive {hiveId}</h1>
            {error && <Alert variant="danger">{error}</Alert>}
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
                                <Button variant="info" onClick={() => handleUpdateBee(bee.id, bee.quantity + 1)}>
                                    Increase
                                </Button>
                                {' '}
                                <Button variant="warning" onClick={() => handleUpdateBee(bee.id, Math.max(1, bee.quantity - 1))}>
                                    Decrease
                                </Button>
                                {' '}
                                <Button variant="danger" onClick={() => handleDeleteBee(bee.id)}>
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
