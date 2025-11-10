import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import AddRecord from "./components/AddRecord";
import RecordList from "./components/RecordList";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          
          <Navbar.Brand as={Link} to="/">
            Waste Management
          </Navbar.Brand>

          <Nav>
            <Nav.Link as={Link} to="/add">
              Add Record
            </Nav.Link>

            <Nav.Link as={Link} to="/list">
              View Records
            </Nav.Link>
          </Nav>

        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<RecordList />} />
        <Route path="/add" element={<AddRecord />} />
        <Route path="/list" element={<RecordList />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
