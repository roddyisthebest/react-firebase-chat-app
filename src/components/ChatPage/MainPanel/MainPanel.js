import React, { Component } from "react";
import MessageHeader from "./MessageHeader";
import Message from "./Message";
import MessageForm from "./MessageForm";

export class MainPanel extends Component {
  render() {
    return (
      <div style={{ padding: "2rem 2rem 0 2rem", color: "#081229" }}>
        <MessageHeader />
        <div
          style={{
            width: "100%",
            height: "450px",
            padding: "1rem",
            marginBottom: "1rem",
            overflowY: "auto",
            border: "2px solid #081229",
          }}
        ></div>
        <MessageForm />
      </div>
    );
  }
}

export default MainPanel;
