import React, { useEffect, useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { postData } from "services/methods/api";
const date = new Date();
function User() {
  //////////////////////////////////
  //Hooks
  const history = useHistory();

  useEffect(() => {

  }, []);


  //////////////////////////////////
  //States
  const [formData, setFormData] = useState();
  const [validationError, setValidationError] = useState('');
  /////////////////////////////////

  /////////////////////////////////




  //////////////////////////////////
  //Methods
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    postData('/outpass', formData).then((res) => {
      // history.push("/dashboard");
    })
      .catch(error => {
        setValidationError(error.error);
      });
  }
  /////////////////////////////////


  //////////////////////////////////
  //Others

  /////////////////////////////////

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Create Outpass</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                  <Row>

                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Outpass Date</label>
                        <Form.Control
                          name="outpass_date"
                          defaultValue=""
                          placeholder="Date"
                          type="Date"
                          min="2023-05-23"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          from
                        </label>
                        <Form.Control
                          name="outpass_from"
                          placeholder="Email"
                          type="time"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>To</label>
                        <Form.Control
                          name="outpass_to"
                          defaultValue="Mike"
                          placeholder="Company"
                          type="time"
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    

                  </Row>

                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Apply
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
         
         
        </Row>
      </Container>
    </>
  );
}

export default User;
