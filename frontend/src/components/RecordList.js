import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import axios from "axios";

function RecordList() {
  // State management for records and filters
  const [records, setRecords] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [zoneFilter, setZoneFilter] = useState("");

  // Fetch records when component mounts
  useEffect(() => {
    fetchRecords();
  }, []);

  // GET request to fetch all records from backend
  const fetchRecords = async () => {
    const response = await axios.get("http://localhost:5000/api/records");
    setRecords(response.data);
  };

  // DELETE request to remove a record
  const deleteRecord = async (id) => {
    await axios.delete(`http://localhost:5000/api/records/${id}`);
    fetchRecords(); // Refresh list after deletion
  };

  // PUT request to update a record
  const updateRecord = async (id) => {
    // Prompt user for updated values
    const zoneName = prompt("Enter zone name:");
    const collectionDate = prompt("Enter collection date (YYYY-MM-DD):");
    const vehicleID = prompt("Enter vehicle ID:");
    const wasteQuantity = prompt("Enter waste quantity:");

    if (zoneName && collectionDate && vehicleID && wasteQuantity) {
      await axios.put(`http://localhost:5000/api/records/${id}`, {
        zoneName,
        collectionDate,
        vehicleID,
        wasteQuantity: Number(wasteQuantity),
      });
      fetchRecords(); // Refresh list after update
    }
  };

  // Filter records based on date and zone criteria
  const filtered = records.filter((record) => {
    const matchesDate =
      !dateFilter || record.collectionDate.substring(0, 10) === dateFilter;
    const matchesZone =
      !zoneFilter ||
      record.zoneName.toLowerCase().includes(zoneFilter.toLowerCase());

    return matchesDate && matchesZone;
  });

  return (
    <Container>
      <h2>Waste Collection Records</h2>

      {/* Filter inputs */}
      <Row>
        <Col md={6}>
          <Form.Label>Filter by Date</Form.Label>
          <Form.Control
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </Col>

        <Col md={6}>
          <Form.Label>Filter by Zone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter zone name"
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
          />
        </Col>
      </Row>
      
      {/* Table displaying filtered records */}
      <Table striped>

        <thead>
          <tr>
            <th>Zone Name</th>
            <th>Collection Date</th>
            <th>Vehicle ID</th>
            <th>Waste Quantity (kg)</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {/* Map through filtered records and display each as a table row */}
          {filtered.map((record) => (
            
            <tr key={record._id}>
              <td>{record.zoneName}</td>
              <td>{record.collectionDate}</td>
              <td>{record.vehicleID}</td>
              <td>{record.wasteQuantity}</td>
              <td>
                {/* Edit button - opens prompts for updating */}
                <Button
                  onClick={() => updateRecord(record._id)}
                  variant="warning"
                  size="sm"
                >
                  Edit
                </Button>{" "}
                
                {/* Delete button - removes record */}
                <Button
                  onClick={() => deleteRecord(record._id)}
                  variant="danger"
                  size="sm"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default RecordList;
