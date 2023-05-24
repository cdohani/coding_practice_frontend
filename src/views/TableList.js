import { map } from "jquery";
import React, { useEffect, useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Modal
} from "react-bootstrap";
import { postData } from "services/methods/api";
import { fetchData } from "services/methods/api";

function TableList() {
  //////////////////////////////////
  //Hooks

  useEffect(() => {
    fetchOutputPasses();
  }, []);


  //////////////////////////////////
  //States
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = React.useState(false);
  /////////////////////////////////

  /////////////////////////////////




  //////////////////////////////////
  //Methods
  function fetchOutputPasses() {
    fetchData('/outpass').then((response) => {
      setData(response.data.data.outpassess);
    })
      .catch(error => {

      });
  }

  function changeOutpassStatus(id,status)
  {
  postData('/outpass/change-outpass-status', {id,status}).then((res) => {
   
  })
    .catch(error => {
      // setValidationError(error.error);
    });

  }

  const hasPermission = (tabName) => {
    const permissionsData = JSON.parse(localStorage.getItem("permissions"));
    return permissionsData.some((permission) => permission.name === tabName);
  };
  /////////////////////////////////


  //////////////////////////////////
  //Others

  /////////////////////////////////
  return (
    <>
      <Container fluid>
        <Row>


          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Outpasses</Card.Title>

              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Outpass date</th>
                      <th className="border-0">Outpass to</th>
                      <th className="border-0">Outpass from</th>
                      <th className="border-0">Student Name</th>
                      {hasPermission("update_outpast") ?
                        <th className="border-0">Action</th>
                        : ""}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item) => {
                      return (
                        <tr>
                          <td>{item.id}</td>
                          <td>{item.outpass_date}</td>
                          <td>{item.outpass_from}</td>
                          <td>{item.outpass_to}</td>
                          <td>{item.student_name}</td>
                          {hasPermission("update_outpast") ?
                            <td><button className="btn btn-secondary mr-2" onClick={() => changeOutpassStatus(item.id,"approved")}>Approved</button><button className="btn btn-warning" onClick={() => changeOutpassStatus(item.id,"rejected")}>Reject</button></td>
                            : ""}
                        </tr>
                      )
                    })}


                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>

    </>
  );
}

export default TableList;
