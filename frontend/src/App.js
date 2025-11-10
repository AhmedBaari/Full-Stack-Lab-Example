// Import routing and UI components
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import AddRecord from "./components/AddRecord";
import RecordList from "./components/RecordList";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* Navigation bar */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Waste Management</Navbar.Brand>

          {/* Navigation links */}
          <Nav>
            <Nav.Link href="/add_record">Add Record</Nav.Link>

            <Nav.Link href="/view_records">View Records</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Route definitions - maps URLs to components */}
      <Routes>
        <Route path="/" element={<RecordList />} />
        <Route path="/add_record" element={<AddRecord />} />
        <Route path="/view_records" element={<RecordList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
