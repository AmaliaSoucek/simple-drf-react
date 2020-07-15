import React from 'react';
import RoomServiceData from '../services/room.js';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import {Pencil, Trash, ChevronDown, Check, X} from 'react-bootstrap-icons';


function Room(props) {
  return (
    <tr>
      <td>{props.room.number}</td>
      <td>{props.room.type}</td>
      <td>
        <Button className="ml-2" variant="outline-danger" onClick={props.onClick}>
          <Trash/>
        </Button>
      </td>
    </tr>
  )
}

class RoomList extends React.Component {
  constructor(props) {
    super(props);
    this.retrieveRooms = this.retrieveRooms.bind(this);
    this.state = {
      rooms: []
    }
  };

  componentDidMount() {
    this.retrieveRooms()
  }

  retrieveRooms() {
    RoomServiceData.getAll()
      .then(response => {
        this.setState({
          rooms: response.data['results']
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteRoom(id) {
    RoomServiceData.delete(id)
        .then(response => {

        })
        .catch(e => {
          console.log(e);
        });
  }

  render() {
    const rooms = this.state.rooms;
    return (
      <Table responsive="lg">
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
          rooms.map((room, index) => (<Room key={room.id} room={room} onClick={() => this.deleteRoom(room.id)}/>))
        }
        </tbody>
      </Table>
    )
  }
};

export default RoomList;
