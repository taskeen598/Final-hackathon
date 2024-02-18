import React from "react";
import { Button, Nav, NavItem } from "reactstrap";
import Logo from "../../logo/Logo";
import Link from "next/link";
import { useRouter } from "next/router";
// interface NavigationItem {
//   title: string;
//   href: string;
//   icon: string;
//   isLogout?: boolean;
// }
const navigation = [
  {
    title: "Dashboard",
    href: "/ui/dashboard",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Cards",
    href: "/ui/cards",
    icon: "bi bi-card-text",
  },
  {
    title: "Table",
    href: "/ui/tables",
    icon: "bi bi-layout-split",
  },
  {
    title: "Logout",
    href: "/",
    icon: "bi bi-escape",
    isLogout: true,
  },
];
// Import statements...

const Sidebar = ({ showMobilemenu }) => {
  const router = useRouter();
  const location = router.pathname;

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    // Redirect to logout page
    router.push("/");
  };

  return (
    <div className="p-3">
      <div className="d-flex align-items-center justify-between">
        <Logo />
        <Button
          close
          size="sm"
          className="ms-auto sm:hidden"
          onClick={showMobilemenu}
        >
          <i className="bi bi-x-square"></i>
        </Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              {navi.isLogout ? (
                <Link href={navi.href}>
                  <a className="nav-link text-secondary py-3" onClick={handleLogout}>
                    <i className={navi.icon}></i>
                    <span className="ms-3 d-inline-block">{navi.title}</span>
                  </a>
                </Link>
              ) : (
                <Link href={navi.href}>
                  <a
                    className={
                      location === navi.href
                        ? "text-primary nav-link py-3"
                        : "nav-link text-secondary py-3"
                    }
                  >
                    <i className={navi.icon}></i>
                    <span className="ms-3 d-inline-block">{navi.title}</span>
                  </a>
                </Link>
              )}
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;