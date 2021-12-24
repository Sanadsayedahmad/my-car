import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { tabs } from "../../helpers/tabs";

function NavigationBarComp({ set, user }) {
  const history = useHistory();
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={"mb-3"}
      style={{
        borderBottom: "1px solid black",
        backgroundColor: " #F7F7F9",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <Container>
        <Navbar.Brand
          href="/"
          style={{ color: "#E63946", fontWeight: "bold", marginRight: "30px" }}
        >
          My-Car
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* cehcking if the user is logged in or not */}
            {user._id
              ? tabs
                  .filter((x) => x.displayForLoggedin)
                  .map((tab, index) => (
                    <Nav.Link key={index} to={tab.href} as={Link}>
                      {tab.name}
                    </Nav.Link>
                  ))
              : tabs
                  .filter((x) => !x.hideForLoggedout)
                  .map((tab, index) => (
                    <Nav.Link key={index} to={tab.href} as={Link}>
                      {tab.name}
                    </Nav.Link>
                  ))}
          </Nav>

          <Nav>
            {/* adding the log out button and the email of the user if exists */}
            {user._id ? (
              <>
                <Navbar.Text>
                  <div style={{ color: "black" }}>{user.email}</div>
                </Navbar.Text>
                <Nav.Link>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      // deleting user info and his token
                      set({});
                      localStorage.removeItem("token");
                      history.push("/");
                    }}
                  >
                    LogOut
                  </Button>
                </Nav.Link>
              </>
            ) : (
              ""
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBarComp;
