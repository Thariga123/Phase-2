import React, { useEffect, useState } from "react";
import AppNavbar from "../components/Shared/Navbar";
import { Container, Card, ListGroup, Row, Col, Badge } from "react-bootstrap";
import "../App.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("feedbackTasks")) || [];
    const storedBoards = JSON.parse(localStorage.getItem("feedbackBoards")) || [];
    setTasks(storedTasks);
    setBoards(storedBoards);
  }, []);

  return (
    <>
      <AppNavbar />
      <Container className="dashboard-container">
        <h2 className="dashboard-title">👋 Welcome back!</h2>
        <p className="dashboard-subtitle">Here’s an overview of your project boards and feedback tasks.</p>

        <Row className="mb-4">
          <Col md={6}>
            <Card className="summary-card">
              <Card.Body className="text-center">
                <h4 className="summary-count">{boards.length}</h4>
                <p className="summary-label">Total Boards</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="summary-card">
              <Card.Body className="text-center">
                <h4 className="summary-count">{tasks.length}</h4>
                <p className="summary-label">Total Tasks</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Card className="dashboard-card mb-4">
              <Card.Header className="dashboard-header">📋 Recent Boards</Card.Header>
              <Card.Body>
                {boards.length === 0 ? (
                  <p className="text-muted">No boards created yet.</p>
                ) : (
                  <ListGroup>
                    {boards.slice(-5).reverse().map((board, index) => (
                      <ListGroup.Item key={index} className="dashboard-item">
                        <span className="fw-semibold">{board.title}</span>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="dashboard-card mb-4">
              <Card.Header className="dashboard-header">📝 Recent Tasks</Card.Header>
              <Card.Body>
                {tasks.length === 0 ? (
                  <p className="text-muted">No tasks available yet.</p>
                ) : (
                  <ListGroup>
                    {tasks.slice(-5).reverse().map((task, index) => (
                      <ListGroup.Item key={index} className="dashboard-item">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <div className="fw-semibold">{task.title}</div>
                            <div className="text-muted small">{task.description}</div>
                          </div>
                          <Badge bg={task.status === "Completed" ? "success" : "warning"}>
                            {task.status}
                          </Badge>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
