import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBees, createBee, updateBeeQuantity, deleteBee } from '../../utils/hivedata/bees';
import { Form, Button, Table, Alert, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';

const Bees = () => {
    const { hiveId, slideId } = useParams();
    const [bees, setBees] = useState([]);
    const [role, setRole] = useState('worker');
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedBee, setSelectedBee] = useState(null);

    useEffect(() => {
        loadBees();
    }, [hiveId, slideId]);

    const loadBees = async () => {
        const beesData = await getBees(hiveId, slideId);
        if (beesData) setBees(beesData);
        else setError('Failed to load bees.');
    };

    const handleAddBee = async (e) => {
        e.preventDefault();
        const newBee = await createBee(hiveId, slideId, { role, quantity });
        if (newBee) {
            setRole('worker');
            setQuantity(1);
            loadBees();
        } else {
            setError('Failed to add bee.');
        }
    };

    const handleDeleteConfirmation = (bee) => {
        setSelectedBee(bee);
        setShowModal(true);
    };

    const handleDeleteBee = async () => {
        const success = await deleteBee(hiveId, slideId, selectedBee.id);
        if (success) {
            await loadBees();
            setShowModal(false);
            setSelectedBee(null);
        } else {
            setError('Failed to delete bee.');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-warning">Bees Management for Slide {slideId} in Hive {hiveId}</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleAddBee} className="mb-3">
                <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)} className="bg-dark text-white">
                        <option value="queen">Queen</option>
                        <option value="worker">Worker</option>
                        <option value="guard">Guard</option>
                        <option value="larva">Larva</option>
                        <option value="mite">Mite</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} required className="bg-dark text-white"/>
                </Form.Group>
                <Button variant="outline-warning" type="submit">
                    Add Bee
                </Button>
            </Form>

            <Table striped bordered hover variant="dark" className="text-warning">
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
                                <Button variant="danger" onClick={() => handleDeleteConfirmation(bee)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Bee</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this bee?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteBee}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Bees;
