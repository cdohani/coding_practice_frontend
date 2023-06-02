import { useEffect, useState } from "react";
import { Button, Card, Container, Row, Table, Col } from "react-bootstrap";
import { postData } from "services/methods/api";
import { fetchData } from "services/methods/api";
import "../assets/css/admin.css";
import { useHistory } from "react-router-dom";

function TableList() {
  useEffect(() => {
    fetchOutputPasses();
  }, []);

  const [data, setData] = useState([]);

  function fetchOutputPasses() {
    fetchData("/outpass")
      .then((response) => {
        setData(response.data.data.outpassess);
        console.log(setData);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function changeOutpassStatus(id, status) {
    postData("/outpass/change-outpass-status", { id, status })
      .then(() => {
        // Update the data array with the updated status
        const updatedData = data.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              status: status,
            };
          }
          return item;
        });
        setData(updatedData);
        console.log(updatedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const hasPermission = (tabName) => {
    const permissionsData = JSON.parse(localStorage.getItem("permissions"));
    return permissionsData.some((permission) => permission.name === tabName);
  };

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
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.outpass_date}</td>
                        <td>{item.outpass_from}</td>
                        <td>{item.outpass_to}</td>
                        <td>{item.student_name}</td>
                        {hasPermission("update_outpast") && (
                          <td>
                            {item.status !== "rejected" && (
                              <Button
                                className={` mr-2 ${
                                  item.status === "approved"
                                    ? "btn-approved"
                                    : "btn-secondary"
                                }`}
                                onClick={() =>
                                  changeOutpassStatus(item.id, "approved")
                                }
                              >
                                {item.status === "approved"
                                  ? "Approved"
                                  : "Approve"}
                              </Button>
                            )}
                            {item.status !== "approved" && (
                              <Button
                                className={` ${
                                  item.status === "rejected"
                                    ? "btn-rejected"
                                    : "btn-warning"
                                }`}
                                onClick={() =>
                                  changeOutpassStatus(item.id, "rejected")
                                }
                              >
                                {item.status === "rejected"
                                  ? "Rejected"
                                  : "Reject"}
                              </Button>
                            )}
                          </td>
                        )}

{!hasPermission("update_outpast")?'dasd':''}
                      </tr>
                    ))}
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
