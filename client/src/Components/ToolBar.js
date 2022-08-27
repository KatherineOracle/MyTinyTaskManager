/*
Returns top tool bar with Status Filter and Bulkupdate dropdown buttons 
*/
import {
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

const ToolBar = (props) => {

    return (
        <Container>
        <Row className="toolbar mb-4 align-items-md-stretch">
          <Col xs lg="shrink">
            <Row className="p-3 align-items-md-center">
              <Col xs lg="auto">
                <label>Show only tasks with status of</label>
              </Col>
              <Col xs lg="auto">
                <DropdownButton title="Select status" onSelect={e => props.filterChangeHander(e)}>                               
                    <Dropdown.Item eventKey="">Any</Dropdown.Item>
                    <Dropdown.Item eventKey="0">Submitted</Dropdown.Item>
                    <Dropdown.Item eventKey="1">In progress</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Completed</Dropdown.Item>                  
                </DropdownButton>
              </Col>
            </Row>
          </Col>
          <Col xs lg="shrink">
            <Row className="p-3  align-items-md-center">
              <Col xs lg="auto">
                <label>Bulk update selected to:</label>
              </Col>
              <Col xs lg="auto">
                <DropdownButton title="Select status"  onSelect={e => props.bulkUpdateHandler(e)}>
                  <Dropdown.Item eventKey="0">Submitted</Dropdown.Item>
                    <Dropdown.Item eventKey="1">In progress</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Completed</Dropdown.Item>
                </DropdownButton>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

    )
}

export default ToolBar