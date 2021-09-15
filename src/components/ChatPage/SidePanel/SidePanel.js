import React, { Component } from "react";
import UserPanel from "./UserPanel";
import Favorited from "./Favorited";
import ChatRooms from "./ChatRooms";
import DirectMessages from "./DirectMessages";

export class SidePanel extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "#081229",
          padding: "2rem",
          minHeight: "100vh",
          color: "white",
          minWidth: "275px",
          fontFamily:
            "  font-family: Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans;",
        }}
      >
        <UserPanel />
        <Favorited />
        <ChatRooms />
        <DirectMessages />
      </div>
    );
  }
}

export default SidePanel;
