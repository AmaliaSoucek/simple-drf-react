import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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


function InstanceEditRow(props) {
    return (
      <tr>
        { props.children }
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
              className="ml-2 mb-2"
              variant="outline-success"
              onClick={props.updateInstance}
          >
            <Check/>
          </Button>
          <Button
              hidden={!props.instance}
              className="ml-2 mb-2"
              variant="outline-danger"
              onClick={props.exitEdit}
          >
            <X/>
          </Button>
        </td>
      </tr>
    )
}


function InstanceShowRow(props) {
  return (
    <tr>
      {
        props.children
      }
      <td className="text-right">
        <Button
            className="ml-2 mb-2"
            variant="outline-secondary"
            onClick={props.openEdit}
        >
          <Pencil/>
        </Button>
        <Button
            className="ml-2 mb-2"
            variant="outline-danger"
            onClick={props.deleteInstance}
        >
          <Trash/>
        </Button>
      </td>
    </tr>
  )
}


function InstanceRow(props) {
  const service = props.service;

  const [edit, setEdit] = useState(false);
  const openEdit = () => {setEdit(true)};
  const exitEdit = () => {setEdit(false)};

  const [form, setForm] = useState(
      props.instance ? {...props.instance} : props.initialForm
  );
  const [errors, setErrors] = useState({});
  const setFormInput = (event) => {
    let newForm = {...form};

    if (event.target.multiple) {
      newForm[event.target.name] = Array.from(
          event.target.selectedOptions, option => option.value
      );
    } else {
      newForm[event.target.name] = event.target.value;
    }
    setForm(newForm);
  };

  const updateInstance = () => {
    service.update(props.instance.id, form)
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
    service.create(form)
        .then(response => {
          props.createInstance(response.data);
        })
        .catch(function (e) {
          if (e.response)
            setErrors(e.response.data);
        })
  };

  if (!props.instance) {
    return <props.EditRow
        errors={errors}
        createInstance={createInstance}
        setFormInput={setFormInput}
    />
  }

  if (edit) {
    return <props.EditRow
        instance={props.instance}
        errors={errors}
        exitEdit={exitEdit}
        updateInstance={updateInstance}
        setFormInput={setFormInput}
    />
  }

  return (
      <props.ShowRow
          instance={props.instance}
          openEdit={openEdit}
          deleteInstance={props.deleteInstance}
      />
  )
}


function InstancesTable(props) {
  const [instances, setInstances] = useState([]);
  const dataGetter = props.service.getAll;

  useEffect(() => {
    dataGetter().then(response => {
        setInstances(response.data['results']);
      });
  }, [dataGetter]);

  const deleteInstance = (id) => {
    props.service.delete(id).then(() => {
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
        <h1 className="mb-5">{props.title}</h1>
        <Table responsive="lg">
          <thead>
            <tr>
              {
                props.header.map((field, index) => (
                    <th key={index}>{field}</th>
                ))
              }
              <th className="text-right">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <InstanceRow
                key='new'
                createInstance={createInstance}
                service={props.service}
                initialForm={props.initialForm}
                EditRow={props.EditRow}
            />
            {
              instances.map((instance, index) => (
                  <InstanceRow
                      key={instance.id}
                      instance={instance}
                      deleteInstance={() => deleteInstance(instance.id)}
                      updateInstance={updateInstance}
                      fields={props.fields}
                      EditRow={props.EditRow}
                      ShowRow={props.ShowRow}
                      service={props.service}
                  />)
              )
            }
          </tbody>
        </Table>
      </Container>
    </Row>
  )
}

export {InstancesTable, FieldError, InstanceEditRow, InstanceShowRow};
