/*
Returns table of tasks
*/
import { useState } from "react";
import { Container, Row, Col, Table, Form } from "react-bootstrap";
import TaskItem from "./TaskItem";

const TaskList = (props) => {
  const tasks = props.tasks;
  let [checked, setChecked] = useState(false);
  let checkedTasks = [...props.selectedItems];

  const handeCheckAll = (e) => {
    let ts = [];

    if (!checked) {
      tasks.forEach((task) => {
        ts.push(task._id);
      });
    }

    //now App component can update selectedItems in state
    props.setCheckedTasks(ts);

    //Toggle checked state 
    setChecked(!checked);
  };

  const checkHandler = (e) => {
    //handle individual child checkbox clicks

    let idx = e.target.getAttribute("data-id");
    let ts = [...checkedTasks];
    let taskIndex = ts.findIndex((id) => id === idx);

    if (taskIndex > -1) {
      ts.splice(taskIndex, 1);
    } else {
      ts.push(idx);
    }

    //now App component can update selectedItems in state
    props.setCheckedTasks(ts);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Table bordered hover>
            <thead>
              <tr className="align-top">
                <th>
                  <Form.Check
                    id="checkAll"
                    checked={props.selectedItems.length === tasks.length}
                    onChange={handeCheckAll}
                  />
                </th>
                <th>Status</th>
                <th>Created on</th>
                <th>Description</th>
                <th>Location</th>
                <th>Priority</th>
                <th>Edit</th>
                <th>Archive</th>
                
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => {
                return (
                  <TaskItem
                    key={task._id}
                    task={task}
                    setEditItem={props.setEditItem}

                    checkHandler={checkHandler}
                    isChecked={checkedTasks.includes(task._id)}
                    deleteHandler={props.deleteHandler}
                    statusChangeHandler={props.statusChangeHandler}
                  />
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskList;
