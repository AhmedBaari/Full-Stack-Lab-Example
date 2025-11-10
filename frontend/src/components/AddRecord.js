import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

function AddRecord() {

  const {
    register, handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await axios.post("http://localhost:5000/api/records", data);
    navigate("/list");
  };

  return (
    <Container>
      <h2>Add Waste Collection Record</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Zone Name</Form.Label>
          <Form.Control {...register("zoneName", { required: true })} />
          {errors.zoneName && <span>Required</span>}
        </Form.Group>

        <Form.Group>
          <Form.Label>Collection Date</Form.Label>
          <Form.Control
            type="date"
            {...register("collectionDate", {
              required: true,
              validate: (v) =>
                new Date(v) <= new Date() || "Future date not allowed",
            })}
          />
          {errors.collectionDate && (
            <span>{errors.collectionDate.message || "Required"}</span>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Vehicle ID</Form.Label>
          <Form.Control {...register("vehicleID", { required: true })} />
          {errors.vehicleID && <span>Required</span>}
        </Form.Group>

        <Form.Group>
          <Form.Label>Waste Quantity (kg)</Form.Label>
          <Form.Control
            type="number"
            {...register("wasteQuantity", { required: true, min: 1 })}
          />
          {errors.wasteQuantity && <span>Must be greater than 0</span>}
        </Form.Group>

        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default AddRecord;
