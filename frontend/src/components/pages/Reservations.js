import React from 'react';
import ReservationServiceData from '../../services/reservation.js';
import RoomServiceData from '../../services/room.js';
import UserServiceData from '../../services/user.js';
import Form from 'react-bootstrap/Form';
import {InstancesTable, FieldError, InstanceEditRow, InstanceShowRow} from '../../components/generic/InstancesTable';
import DataGetterSelect from '../../components/generic/FormFields';


function ReservationEditRow(props) {
    return (
      <InstanceEditRow
          instance={props.instance}
          exitEdit={props.exitEdit}
          updateInstance={props.updateInstance}
          createInstance={props.createInstance}
      >
        <td>
          {props.instance ? props.instance.id: ''}
        </td>
        <td>
          <DataGetterSelect
              size="sm"
              dataGetter={UserServiceData.getAll}
              name="user"
              onChange={props.setFormInput}
              value={props.instance ? props.instance.user: undefined}
              isInvalid={!!props.errors.user}
              valueKey="id"
              textKey="email"
          />
          <FieldError errors={props.errors.user}/>
        </td>
        <td>
          <Form.Control
              size="sm"
              type="date"
              name="from_date"
              onChange={(e) => props.setFormInput(e)}
              defaultValue={props.instance ? props.instance.from_date: ''}
              isInvalid={!!props.errors.from_date}
          >
          </Form.Control>
          <FieldError errors={props.errors.from_date}/>
        </td>
        <td>
          <Form.Control
              size="sm"
              type="date"
              name="to_date"
              onChange={(e) => props.setFormInput(e)}
              defaultValue={props.instance ? props.instance.to_date: ''}
              isInvalid={!!props.errors.to_date}
          >
          </Form.Control>
          <FieldError errors={props.errors.to_date}/>
        </td>
        <td>
          <Form.Control
              size="sm"
              type="text"
              name="note"
              onChange={(e) => props.setFormInput(e)}
              defaultValue={props.instance ? props.instance.note: ''}
              isInvalid={!!props.errors.note}
          >
          </Form.Control>
          <FieldError errors={props.errors.to_date}/>
        </td>
        <td>
          <DataGetterSelect
              size="sm"
              dataGetter={RoomServiceData.getAll}
              name="rooms"
              onChange={props.setFormInput}
              value={props.instance ? props.instance.rooms: undefined}
              isInvalid={!!props.errors.rooms}
              valueKey="id"
              textKey="number"
              multiple={true}
          />
          <FieldError errors={props.errors.rooms}/>
        </td>
      </InstanceEditRow>
    )
}


function ReservationShowRow(props) {
  return (
      <InstanceShowRow
          instance={props.instance}
          openEdit={props.openEdit}
          deleteInstance={props.deleteInstance}>
        <td>{props.instance.id}</td>
        <td>{props.instance.user_details.email}</td>
        <td>{props.instance.from_date}</td>
        <td>{props.instance.to_date}</td>
        <td>{props.instance.note}</td>
        <td><ul>{props.instance.rooms_details.map(room => (<li key={room.id}>{room.number}</li>))}</ul></td>
      </InstanceShowRow>
  )
}


function ReservationList() {
  return (
    <InstancesTable
        EditRow={ReservationEditRow}
        ShowRow={ReservationShowRow}
        title="Reservations"
        header={['ID', 'User', 'From', 'To', 'Note', 'Rooms']}
        service={ReservationServiceData}
        initialForm={{}}
    />
  )
}

export default ReservationList;
