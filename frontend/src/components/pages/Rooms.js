import React from 'react';
import RoomServiceData from '../../services/room.js';
import Form from 'react-bootstrap/Form';
import {InstancesTable, FieldError, InstanceEditRow, InstanceShowRow} from '../../components/generic/InstancesTable';


function RoomEditRow(props) {
    return (
      <InstanceEditRow
          instance={props.instance}
          exitEdit={props.exitEdit}
          updateInstance={props.updateInstance}
          createInstance={props.createInstance}
      >
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
      </InstanceEditRow>
    )
}


function RoomShowRow(props) {
  return (
      <InstanceShowRow
          instance={props.instance}
          openEdit={props.openEdit}
          deleteInstance={props.deleteInstance}>
        <td>{props.instance.number}</td>
        <td>{props.instance.type}</td>
        <td>{props.instance.price}</td>
      </InstanceShowRow>
  )
}


function RoomList() {
  return (
    <InstancesTable
        EditRow={RoomEditRow}
        ShowRow={RoomShowRow}
        title="Rooms"
        header={['#', 'Type', 'Price']}
        service={RoomServiceData}
        initialForm={{'type': 'single'}}
    />
  )
}

export default RoomList;
