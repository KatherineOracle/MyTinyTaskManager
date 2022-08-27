/*
Returns form to update existing task 
*/

import { useState, useEffect } from "react";
import { Modal, Row, Col, Button, Form } from "react-bootstrap";
import { taskUpdate } from "../utils/APICalls";

const TaskModal = (props) =>  {
  
  const [task, setTask] = useState({...props.task});
  const [error, setError] = useState(null);

  useEffect(() => {
    setTask({...props.task});
  }, [props.task]);  
  
  async function handleSubmitTask(e) {
    e.preventDefault(); //don't refresh page

    console.log(task)

    taskUpdate(task._id, task).then((result) => {
      if (result.message) {
        setError(result.message);
      } else if (result.error) {
        setError(result.error);
      } else {
        // post success!
        // Close the modal
        props.showModalHandler(false);
        // App component to refresh task list
        props.refreshTasks();
        
      }
    });
  }



  return (

    <Modal show={props.show} size="xl"
    aria-labelledby="contained-modal-title-vcenter"
    centered onHide={() => props.showModalHandler(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Update task</Modal.Title>
    </Modal.Header>
    <Modal.Body>

<Form onSubmit={handleSubmitTask}>
  <Row className="align-items-md-center">
    <Col>
      <Form.Control
        type="text"
        name="description"
        value={task.description }
        placeholder="Task description"
        onChange={(e) =>
          setTask({ ...task, description: e.target.value })
        }
        required
      />
    </Col>
    <Col>
      <Form.Control
        type="text"
        name="location"
        value={task.location}
        placeholder="Task location"
        onChange={(e) =>
          setTask({ ...task, location: e.target.value })
        }
        required
      />
    </Col>
    <Col xs lg="2">
      <Form.Select
        onChange={(e) =>
          setTask({ ...task, priority: e.target.value })
        }
        value={task.priority}
        required
      >
        <option>-- select priority --</option>
        <option value="1">High</option>
        <option value="2">Medium</option>
        <option value="3">Low</option>
      </Form.Select>
    </Col>
    <Col xs lg="auto">
      <Button type="submit" variant="secondary" size="md">
       Save Changes
      </Button>
    </Col>
  </Row>
</Form>      


    </Modal.Body>
    <Modal.Footer>

    </Modal.Footer>
  </Modal>

  );
}

export default TaskModal;