import React, { Component } from "react";
import { FaRegSmileWink, FaPlus } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import firebase from "firebase/compat";

export class ChatRooms extends Component {
  state = {
    show: false,
    name: "",
    description: "",
    chatRoomRef: firebase.database().ref("chatRooms"),
    chatRooms: [],
  };

  componentDidMount() {
    this.addChatRoomListeners();
  }

  addChatRoomListeners = () => {
    let chatRoomArray = [];
    this.state.chatRoomRef.on("child_added", (DataSnapshot) => {
      chatRoomArray.push(DataSnapshot.val());
      this.setState({ chatRooms: chatRoomArray });
    });
  };

  toggle = () => {
    this.setState({ show: !this.state.show });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, description } = this.state;
    if (this.isFormValid(name, description)) {
      this.addChatRoom();
    }
  };
  addChatRoom = async () => {
    const key = this.state.chatRoomRef.push().key;
    const { name, description } = this.state;
    const user = this.props.user;
    const newChatRoom = {
      key,
      name,
      description,
      createBy: {
        name: user.displayName,
        image: user.photoURL,
      },
    };
    try {
      await this.state.chatRoomRef.child(key).update(newChatRoom);
      this.setState({
        name: "",
        description: "",
        show: false,
      });
    } catch (e) {
      alert(e);
    }
  };

  isFormValid = (name, description) => name && description;
  renderChatRooms = (rooms) =>
    rooms.length > 0 &&
    rooms.map((room) => <li key={room.key}>#{room.name}</li>);
  render() {
    return (
      <div>
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaRegSmileWink style={{ marginRight: 3 }} />
          CHATS ROOMS (1)
          <FaPlus
            onClick={this.toggle}
            style={{ position: "absolute", right: 0, cursor: "pointer" }}
          />
        </div>

        <ul style={{ listStyleType: "none", padding: 0 }}>
          {this.renderChatRooms(this.state.chatRooms)}
        </ul>
        {/* ADDMODAL */}

        <Modal show={this.state.show} toggle={this.toggle}>
          <Modal.Header toggle={this.toggle}>
            <Modal.Title>Create a chat room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Room name</Form.Label>
                <Form.Control
                  onChange={(e) => this.setState({ name: e.target.value })}
                  type="text"
                  placeholder="Enter a chat room name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    this.setState({
                      description: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Enter a chat room description"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="primary" onClick={this.handleSubmit}>
              Create
            </Button>{" "}
            <Button color="danger" onClick={this.toggle}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(ChatRooms);
