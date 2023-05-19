import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "./registration.scss"

function PlayerRegistration() {
  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Player Name</Form.Label>
          <Form.Control type="text" placeholder="Enter palyer Name" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Aadhar Number</Form.Label>
          <Form.Control type="number" placeholder="Player Aadhar Number" />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Club/Scholl Name</Form.Label>
          <Form.Control type="text" placeholder="Enter palyer Club/Scholl Name" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" placeholder="DOB as per Aadhar card" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label className='player-category'> Player Category:: </Form.Label>
        <Form.Label className='player-category-selection'> Under-14 </Form.Label>
        <Form.Label className='player-category'> Based on you Aadhar DOB</Form.Label>

      </Form.Group>

      <Row className="mb-3">
      <Col sm={{ span: 10, offset: 1 }}>
          <Form.Check label="100M" />
          <Form.Check label="200M" />
          <Form.Check label="1500M" />
          <Form.Check label="Long Jump" />
        </Col>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>UPI Number</Form.Label>
          <Form.Control type="number" placeholder="Google-Pay/PhonePee/Paytm" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Contact Mobile</Form.Label>
          <Form.Control type="number" placeholder="Mobile Number" />
        </Form.Group>
      </Row>


      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default PlayerRegistration;