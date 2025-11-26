import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Badge } from 'react-bootstrap';

function Submissions() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('taskFeedbacks'));
        if (Array.isArray(stored)) {
            setFeedbacks(stored);
        } else {
            setFeedbacks([]); 
        }
    }, []);

    return (
        <Container className="py-4">
            <h3 className="mb-4">All Task Feedbacks</h3>
            <Row>
                {feedbacks.length === 0 ? (
                    <p>No feedback submissions found.</p>
                ) : (
                    feedbacks.map((fb, index) => (
                        <Col md={6} key={index} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{fb.name} <Badge bg="success">{fb.completed}</Badge></Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{fb.email}</Card.Subtitle>
                                    <Card.Text>
                                        <strong>Phone:</strong> {fb.phone} <br />
                                        <strong>Quality:</strong> {fb.quality} <br />
                                        <strong>Difficulty:</strong> {fb.difficulty || 'None'} <br />
                                        <strong>Remarks:</strong> {fb.remarks || 'N/A'} <br />
                                        <strong>Rating:</strong> {fb.stars ? `${fb.stars} ★` : 'Not rated'}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
}

export default Submissions;
