import React from 'react'
import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Pencil, Trash, ChevronDown, Check, X} from 'react-bootstrap-icons';


function TodoItem(props) {
  return (
      <Card>
        <Card.Header className="d-flex text-left font-weight-bold align-items-baseline">
          {props.item.title}
          <Accordion.Toggle as={Button} eventKey={props.item.id} className="ml-auto" variant="outline-primary">
            <ChevronDown/>
          </Accordion.Toggle>
          <Accordion.Toggle as={Button} eventKey={`edit-${props.item.id}`} className="ml-2" variant="outline-secondary">
            <Pencil/>
          </Accordion.Toggle>
          <Button className="ml-2" variant="outline-danger" onClick={props.handleRemove}>
            <Trash/>
          </Button>
        </Card.Header>
        <Accordion.Collapse eventKey={props.item.id}>
          <Card.Body className="text-left">{props.item.text}</Card.Body>
        </Accordion.Collapse>
        <Accordion.Collapse eventKey={`edit-${props.item.id}`}>
          <Card.Body>
            <Form inline>
              <Form.Label htmlFor="title" className="mb-2 mr-sm-2">
                Title
              </Form.Label>
              <Form.Control className="mb-2 mr-sm-2" name="title" value={props.item.title}/>
              <Form.Label htmlFor="text" className="mb-2 mr-sm-2">
                Text
              </Form.Label>
              <Form.Control className="mb-2 mr-sm-2" name="text" value={props.item.text}/>
              <Button variant="outline-success" className="mb-2 ml-auto" onClick={props.handleUpdate}><Check/></Button>
              <Button variant="outline-danger" className="mb-2 ml-2"><X/></Button>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
  )
}


class Todo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [{
        id: 1,
        title: 'A',
        text: 'a'
      }, {
        id: 2,
        title: 'B',
        text: 'b'
      }
      ]}
  }

  handleUpdate(id) {
    alert(id);
  }

  handleRemove(id) {
    alert(id);
  }

  render() {
    const items = this.state.items;

    return (
        <Container className="p-5">
          <Accordion>
            {
              items.map((item, index) => (
                  <TodoItem
                      key={item.id}
                      item={item}
                      handleUpdate={() => this.handleUpdate(item.id)}
                      handleRemove={() => this.handleRemove(item.id)}
                  />
              ))
            }
          </Accordion>
        </Container>
    )
  }
}

export default Todo;