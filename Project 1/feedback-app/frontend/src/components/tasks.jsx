import React, { useEffect, useState } from 'react';
import AppNavbar from "../components/Shared/Navbar";
import { Container, Card, Button, Form, Modal, ListGroup } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import '../App.css';

function useStickyState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const sticky = localStorage.getItem(key);
    return sticky ? JSON.parse(sticky) : defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

function Tasks() {
  const [tasks, setTasks] = useStickyState('feedbackTasks', []);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskIndex, setTaskIndex] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', status: 'Pending' });

  const handleShowModal = () => {
    setFormData({ title: '', description: '', status: 'Pending' });
    setIsEditing(false);
    setShowModal(true);
  };
  const handleEdit = index => {
    setFormData(tasks[index]);
    setTaskIndex(index);
    setIsEditing(true);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ title: '', description: '', status: 'Pending' });
    setIsEditing(false);
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert('Please fill in all required fields.');
      return;
    }
    if (isEditing) {
      const updated = [...tasks];
      updated[taskIndex] = formData;
      setTasks(updated);
    } else {
      setTasks([...tasks, formData]);
    }
    handleCloseModal();
  };
  const handleDelete = index => {
    if (window.confirm("Are you sure?")) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };
  const handleDragEnd = result => {
    if (!result.destination) return;
    const updated = [...tasks];
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);
    setTasks(updated);
  };

  return (
    <>
      <AppNavbar />
      <Container className="task-container">
        <Card className="task-card shadow">
          <Card.Header className="task-header">
            <h5 className="mb-0">📝 Task List</h5>
            <Button className="btn-add-task" onClick={handleShowModal}>+ Add Task</Button>
          </Card.Header>
          <Card.Body>
            {tasks.length === 0 ? (
              <p className="text-muted">No tasks available.</p>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="taskList">
                  {(provided) => (
                    <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                      {tasks.map((task, index) => (
                        <Draggable key={index.toString()} draggableId={index.toString()} index={index}>
                          {(provided, snapshot) => (
                            <ListGroup.Item
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="task-item"
                              style={{
                                ...provided.draggableProps.style,
                                backgroundColor: snapshot.isDragging ? "#d0f0ec" : "#ffffff"
                              }}
                            >
                              <div>
                                <div className="fw-bold">{task.title}</div>
                                <div className="text-muted small">{task.description}</div>
                                <span className={`badge bg-${task.status === 'Completed' ? 'success' : 'warning'} mt-1`}>
                                  {task.status}
                                </span>
                              </div>
                              <div className="task-buttons">
                                <Button size="sm" variant="outline-success" onClick={() => handleEdit(index)}>✏️ Edit</Button>{' '}
                                <Button size="sm" variant="outline-danger" onClick={() => handleDelete(index)}>❌ Delete</Button>
                              </div>
                            </ListGroup.Item>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ListGroup>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton className="board-modal-header">
            <Modal.Title>{isEditing ? "Edit Task" : "Create New Task"}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleFormSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.title}
                  placeholder="E.g. Collect feedback..."
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={formData.description}
                  placeholder="Brief task details"
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
              <Button type="submit" className="btn btn-success">
                {isEditing ? 'Update Task' : 'Add Task'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </>
  );
}

export default Tasks;
