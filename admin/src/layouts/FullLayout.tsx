import React, { useState } from "react";
import { Container } from "reactstrap";
import Header from "./header/Header";
import Sidebar from "./sidebars/vertical/Sidebar";

interface FullLayoutProps {
  children: React.ReactNode;
}

const FullLayout: React.FC<FullLayoutProps> = ({ children }: FullLayoutProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const showMobilemenu = () => {
    setOpen(!open);
  };

  return (
    <main>
      <div className="pageWrapper d-md-block d-lg-flex">
        {/* Sidebar */}
        <aside className={`sidebarArea shadow bg-white ${!open ? "" : "showSidebar"}`}>
          <Sidebar showMobilemenu={() => showMobilemenu()} />
        </aside>
        {/* Content Area */}
        <div className="contentArea">
          {/* Header */}
          <Header showMobmenu={() => showMobilemenu()} />
          {/* Middle Content */}
          <Container className="p-4 wrapper" fluid>
            <div>{children}</div>
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;