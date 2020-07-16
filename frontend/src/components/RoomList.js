import React, {useState, useEffect} from 'react';
import RoomServiceData from '../services/room.js';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {Pencil, Trash, Check, X, Plus} from 'react-bootstrap-icons';


function FieldError(props) {
    if (props.errors)
      return (
          <Form.Control.Feedback type="invalid">
            <ul>
              {
                props.errors.map((error, index) => (<li key={index}>{error}</li>))
              }
            </ul>
          </Form.Control.Feedback>
      );

    return <Form.Control.Feedback type="invalid"/>;
}


function EditRow(props) {
    return (
      <tr>
        <td>
            <Form.Control
                disabled={!!props.instance}
                type="text"
                name="number"
                onChange={(e) => props.setFormInput(e)}
                defaultValue={props.instance ? props.instance.number: ''}
                isInvalid={!!props.errors.number}
            />
            <FieldError errors={props.errors.number}/>
          </td>
        <td>
          <Form.Control
              as="select"
              name="type"
              onChange={(e) => props.setFormInput(e)}
              defaultValue={props.instance ? props.instance.type: ''}
              isInvalid={!!props.errors.type}
          >
            <option>single</option>
            <option>double</option>
            <option>twin</option>
          </Form.Control>
          <FieldError errors={props.errors.type}/>
        </td>
        <td>
          <Form.Control
              type="text"
              name="price"
              onChange={(e) => props.setFormInput(e)}
              defaultValue={props.instance ? props.instance.price: ''}
              isInvalid={!!props.errors.price}
          />
          <FieldError errors={props.errors.price}/>
        </td>
        <td className="text-right">
          <Button
              hidden={!!props.instance}
              className="ml-2"
              variant="outline-success"
              onClick={props.createInstance}
          >
            <Plus/>
          </Button>
          <Button
              hidden={!props.instance}
              className="ml-2"
              variant="outline-success"
              onClick={props.updateInstance}
          >
            <Check/>
          </Button>
          <Button
              hidden={!props.instance}
              className="ml-2"
              variant="outline-danger"
              onClick={props.exitEdit}
          >
            <X/>
          </Button>
        </td>
      </tr>
    )
}


function Room(props) {
  const [edit, setEdit] = useState(false);
  const openEdit = () => {setEdit(true)};
  const exitEdit = () => {setEdit(false)};

  const [form, setForm] = useState(props.instance ? {...props.instance} : {'type': 'single'});
  const [errors, setErrors] = useState({});
  const setFormInput = (event) => {
    let newForm = {...form};
    newForm[event.target.name] = event.target.value;
    setForm(newForm);
  };

  const updateInstance = () => {
    RoomServiceData.update(props.instance.id, form)
        .then(response => {
          props.updateInstance(props.instance.id, response.data);
          exitEdit();
        })
        .catch(function (e) {
          if (e.response)
            setErrors(e.response.data);
        })
  };

  const createInstance = () => {
    RoomServiceData.create(form)
        .then(response => {
          props.createInstance(response.data);
        })
        .catch(function (e) {
          if (e.response)
            setErrors(e.response.data);
        })
  };

  if (!props.instance) {
    return <EditRow
        errors={errors}
        createInstance={createInstance}
        setFormInput={setFormInput}
    />
  }

  if (edit) {
    return <EditRow
        instance={props.instance}
        errors={errors}
        exitEdit={exitEdit}
        updateInstance={updateInstance}
        setFormInput={setFormInput}
    />
  }

  return (
    <tr>
      <td>{props.instance.number}</td>
      <td>{props.instance.type}</td>
      <td>{props.instance.price}€</td>
      <td className="text-right">
        <Button
            className="ml-2"
            variant="outline-secondary"
            onClick={openEdit}
        >
          <Pencil/>
        </Button>
        <Button
            className="ml-2"
            variant="outline-danger"
            onClick={props.deleteInstance}
        >
          <Trash/>
        </Button>
      </td>
    </tr>
  )
}


function RoomList() {
  const [instances, setInstances] = useState([]);

  useEffect(() => {
    RoomServiceData.getAll()
      .then(response => {
        setInstances(response.data['results']);
      });
  }, []);

  const deleteInstance = (id) => {
    RoomServiceData.delete(id).then(() => {
      setInstances([...instances].filter(instance => instance.id !== id));
    })
  };

  const createInstance = (data) => {
    setInstances([data, ...instances]);
  };

  const updateInstance = (id, data) => {
    let newInstances = [...instances];
    let objIndex = newInstances.findIndex((obj => obj.id === id));
    newInstances[objIndex] = data;
    setInstances(newInstances);
  };

  return (
    <Row>
      <Container>
        <h1 className="mb-5">Rooms</h1>
        <Table responsive="lg">
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Price</th>
              <th className="text-right">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <Room key='new' createInstance={createInstance}/>
            {
              instances.map((instance, index) => (
                  <Room
                      key={instance.id}
                      instance={instance}
                      deleteInstance={() => deleteInstance(instance.id)}
                      updateInstance={updateInstance}
                  />)
              )
            }
          </tbody>
        </Table>
      </Container>
    </Row>
  )
}

export default RoomList;
