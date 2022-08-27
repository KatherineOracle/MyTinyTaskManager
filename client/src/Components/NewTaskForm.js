/*
Returns form to capture new task input
*/
import { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { taskPost } from "../utils/APICalls";

const NewTaskForm = (props) => {
  const blankTask = { description: "", location: "", priority: "" };
  const [task, setTask] = useState({ ...blankTask });
  const [error, setError] = useState(null);

  async function handleSubmitTask(e) {
    e.preventDefault(); //don't refresh page
    taskPost(task).then((result) => {
      if (result.message) {
        setError(result.message);
      } else if (result.error) {
        setError(result.error);
      } else {
        // post success!
        // Clear the form
        setTask({ ...blankTask });
        // App component to refresh task list
        props.refreshTasks();
      }
    });
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Row className="toolbar p-2">
        <Col>
          <h5>Add new task</h5>

          <Form onSubmit={handleSubmitTask}>
            <Row className="align-items-md-center">
              <Col>
                <Form.Control
                  type="text"
                  name="description"
                  value={task.description}
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
                  Add task
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewTaskForm;
