import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import axios from "axios";

function RecordList() {
  const [records, setRecords] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [zoneFilter, setZoneFilter] = useState("");

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const response = await axios.get("http://localhost:5000/api/records");
    setRecords(response.data);
  };

  const deleteRecord = async (id) => {
    await axios.delete(`http://localhost:5000/api/records/${id}`);
    fetchRecords();
  };

  const updateRecord = async (id) => {
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
      fetchRecords();
    }
  };

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
          {filtered.map((record) => (
            
            <tr key={record._id}>
              <td>{record.zoneName}</td>
              <td>{record.collectionDate}</td>
              <td>{record.vehicleID}</td>
              <td>{record.wasteQuantity}</td>
              <td>
                <Button
                  onClick={() => updateRecord(record._id)}
                  variant="warning"
                  size="sm"
                >
                  Edit
                </Button>{" "}
                
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
