/*
Returns single row in the task list table
*/
import { Button, ButtonGroup, ToggleButton, Form } from "react-bootstrap";



const TaskItem = (props) => {
  const radios = [
    { name: "Submitted", style: "danger", value: 0 },
    { name: "In progress", style: "success", value: 1 },
    { name: "Complete", style: "info", value: 2 },
  ];

  const priorities = { 1: "High", 2: "Medium", 3: "Low" };

  return (
    <tr>
      <td>
        <Form.Check
          checked={props.isChecked}
          data-id={props.task._id}
          onChange={props.checkHandler}
          id={`default-x`}
        />
      </td>
      <td>
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={`${props.task._id}-${idx}`}
              id={`radio-${props.task._id}-${idx}`}
              type="radio"
              size="sm"
              variant={`outline-${radio.style}`}
              name={`radio-${props.task._id}`}
              value={radio.value}
              checked={props.task.status === radio.value}
              onChange={(event) =>
                props.statusChangeHandler(
                  props.task._id,
                  event.currentTarget.value
                )
              }
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </td>
      <td>{new Date(props.task.createdOn).toLocaleString()}</td>
      <td>{props.task.description}</td>
      <td>{props.task.location}</td>
      <td>{priorities[props.task.priority]}</td>
      <td>
        <Button
          variant="warning"
          size="sm"
          onClick={(event) => props.setEditItem(props.task)}
        >
          <img alt="" width="10" height="10" src="icon-edit.svg" />
        </Button>
      </td>        
      <td>
        <Button
          variant="danger"
          size="sm"
          onClick={(event) => props.deleteHandler(props.task._id)}
        >
         &times;
        </Button>
      </td> 
   
    </tr>
  );
};

export default TaskItem;
