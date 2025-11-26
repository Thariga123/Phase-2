import React, { useState } from 'react';
import { Card, Container, Form, InputGroup, Row, Col, Button, Alert } from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input';
import { FaStar } from 'react-icons/fa';
import 'react-phone-number-input/style.css';
import AppNavbar from "../components/Shared/Navbar";


function TaskFeedbackForm() {
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState();
    const [completed, setCompleted] = useState('');
    const [quality, setQuality] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [remarks, setRemarks] = useState('');
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !phone || !completed || !quality) {
            setError('Please fill all required fields.');
            return;
        }

        const feedback = {
            name,
            email,
            phone,
            completed,
            quality,
            difficulty,
            remarks,
            stars: rating
        };

        const existing = JSON.parse(localStorage.getItem('taskFeedbacks')) || [];
        existing.push(feedback);
        localStorage.setItem('taskFeedbacks', JSON.stringify(existing));
        setSubmitted(true);
    };

    return (
        <>
        <AppNavbar />
        <Container className="py-4">
            {!submitted ? (
                <Card className="feedback-card">
                      <Card.Header className="form-header">Submit Your Feedback</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            {error && <Alert variant="danger">{error}</Alert>}

                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Label>Employee Name *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Email *</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Label>Phone *</Form.Label>
                                    <PhoneInput
                                        className="form-control"
                                        placeholder="Enter phone number"
                                        value={phone}
                                        onChange={setPhone}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Task Completed? *</Form.Label>
                                    <Form.Select value={completed} onChange={e => setCompleted(e.target.value)}>
                                        <option value="">-- Select --</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </Form.Select>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Label>Task Quality *</Form.Label>
                                    <Form.Select value={quality} onChange={e => setQuality(e.target.value)}>
                                        <option value="">-- Select --</option>
                                        <option>Excellent</option>
                                        <option>Good</option>
                                        <option>Average</option>
                                        <option>Poor</option>
                                    </Form.Select>
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Difficulty Faced (Optional)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Briefly explain if any"
                                        value={difficulty}
                                        onChange={e => setDifficulty(e.target.value)}
                                    />
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Suggestions / Remarks</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Your suggestions or observations"
                                    value={remarks}
                                    onChange={e => setRemarks(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label>Overall Task Experience (Rate out of 5)</Form.Label>
                                <div>
                                    {[...Array(5)].map((star, index) => {
                                        const currentRating = index + 1;
                                        return (
                                            <label key={index}>
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    value={currentRating}
                                                    onClick={() => setRating(currentRating)}
                                                    style={{ display: "none" }}
                                                />
                                                <FaStar
                                                    className="star"
                                                    size={30}
                                                    color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                                    onMouseEnter={() => setHover(currentRating)}
                                                    onMouseLeave={() => setHover(null)}
                                                    style={{ cursor: 'pointer', marginRight: 5 }}
                                                />
                                            </label>
                                        );
                                    })}
                                </div>
                            </Form.Group>

                            <div className="text-end">
                                <Button type="submit" className="btn btn-success px-4">
                                    Submit Feedback
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            ) : (
                <Card className="text-center shadow-sm py-5">
                    <Card.Body>
                        <div className="mb-3">
                            <div className="circle-check success-animation" style={{ fontSize: '3rem', color: 'green' }}>
                                &#10003;
                            </div>
                        </div>
                        <Card.Title>Thank You!</Card.Title>
                        <Card.Text>Your task feedback has been recorded successfully.</Card.Text>
                        <Button variant="success" onClick={() => (window.location.href = '/submissions')}>
                            View All Feedback
                        </Button>
                    </Card.Body>
                </Card>
            )}
        </Container>
        </>
    );
}

export default TaskFeedbackForm;
