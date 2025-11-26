import React, { useState, useEffect } from "react";
import AppNavbar from "../components/Shared/Navbar";
import {
  Container,
  Card,
  Button,
  Form,
  Modal,
  ListGroup,
} from "react-bootstrap";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import "../App.css";

// Sticky state hook to persist boards across navigation
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

function Boards() {
  const [boards, setBoards] = useStickyState("feedbackBoards", []);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [boardIndex, setBoardIndex] = useState(null);
  const [formData, setFormData] = useState({ title: "" });

  const handleShowModal = () => {
    setFormData({ title: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (index) => {
    setFormData(boards[index]);
    setBoardIndex(index);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ title: "" });
    setIsEditing(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Board title cannot be empty.");
      return;
    }
    const updated = [...boards];
    if (isEditing) {
      updated[boardIndex] = formData;
    } else {
      updated.push(formData);
    }
    setBoards(updated);
    handleCloseModal();
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      setBoards(boards.filter((_, i) => i !== index));
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = [...boards];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setBoards(reordered);
  };

  return (
    <>
      <AppNavbar />
      <Container className="board-container">
        <Card className="board-card shadow">
          <Card.Header className="board-header">
            <h5 className="mb-0">📋 Boards</h5>
            <Button className="btn-add-task" onClick={handleShowModal}>
              + Add Board
            </Button>
          </Card.Header>
          <Card.Body>
            {boards.length === 0 ? (
              <p className="text-muted">No boards created yet.</p>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="boardList">
                  {(provided) => (
                    <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                      {boards.map((board, index) => (
                        <Draggable
                          key={index.toString()}
                          draggableId={index.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <ListGroup.Item
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="task-item"
                              style={{
                                ...provided.draggableProps.style,
                                backgroundColor: snapshot.isDragging ? "#d0f0ec" : "#ffffff",
                              }}
                            >
                              <div className="fw-medium">{board.title}</div>
                              <div className="task-buttons">
                                <Button
                                  size="sm"
                                  variant="outline-success"
                                  onClick={() => handleEdit(index)}
                                >
                                  ✏️ Edit
                                </Button>{" "}
                                <Button
                                  size="sm"
                                  variant="outline-danger"
                                  onClick={() => handleDelete(index)}
                                >
                                  ❌ Delete
                                </Button>
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
            <Modal.Title>
              {isEditing ? "Edit Board" : "Create New Board"}
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleFormSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Board Title</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.title}
                  placeholder="E.g. Marketing Tasks"
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button type="submit" className="btn btn-success">
                {isEditing ? "Update" : "Add Board"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </>
  );
}

export default Boards;
