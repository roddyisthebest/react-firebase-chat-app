import React from "react";
import SidePanel from "./SidePanel/SidePanel";
import MainPanel from "./MainPanel/MainPanel";
function ChatPage() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "300px 1fr",
      }}
    >
      <SidePanel />
      <MainPanel />
    </div>
  );
}

export default ChatPage;
