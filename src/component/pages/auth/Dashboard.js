import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { AiOutlineCheck, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import AddModalComponent from "../../Modal/AddModal";
import EditModalComponent from "../../Modal/EditModal";
import Spinner from "../../Spinner/Spinner";
import Navbar from "../../Navbar/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";

const App = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [spinner, setSpinner] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [modal, setModal] = useState(false);

  const notifyErr = (value) => {
    toast.error(value, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
    }, 1000);
    getData();
  }, []);

  //request
  const deleteTask = async (id) => {
    axios
      .delete("https://simple-to-do-list-app-0.herokuapp.com/api/v2/" + id)
      .then((response) => {
        let newTaskList = dataList.filter((data) => data._id !== id);
        setDataList(newTaskList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getData = async () => {
    axios
      .get(
        "https://simple-to-do-list-app-0.herokuapp.com/api/v2/" +
          currentUser.email
      )
      .then((response) => {
        if (response.data.length > 0) {
          setDataList(response.data);
        }
      })
      .catch((error) => {
        const resMessage = error.response.data.message;
        if (resMessage.name === "TokenExpiredError") {
          logout();
          notifyErr("Your token is outdated, Login to continue!");
          history.push("/login");
        }
      });
  };

  const statusUpdate = async (id, statusParam) => {
    const reqValue = { status: statusParam };
    axios
      .post(
        "https://simple-to-do-list-app-0.herokuapp.com/api/v2/status/" + id,
        reqValue
      )
      .then((response) => {
        setDataList(
          dataList.map((data) =>
            data._id === id ? { ...data, status: statusParam } : data
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const statusHandle = (id, status) => {
    let newStatus = false;
    if (status) {
      newStatus = false;
    } else {
      newStatus = true;
    }
    statusUpdate(id, newStatus);
  };

  //modals
  const modalShow = () => {
    setModal(true);
  };

  return (
    <>
      <Navbar />
      <div className="main">
        <Container fluid>
          <div className="d-flex justify-content-center">
            <div className="task-list">
              <Button
                variant=""
                type="button"
                onClick={modalShow}
                className="btn btn-add btn-outline-primary rounded-pill"
              >
                Create new task
              </Button>

              <AddModalComponent
                show={modal}
                onHide={() => {
                  setModal(false);
                }}
              />

              {spinner ? (
                <Spinner />
              ) : (
                <Table responsive>
                  <thead>
                    <tr>
                      <th></th>
                      <th>To Do</th>
                      <th>Description</th>
                      <th>Date</th>
                      <th className="col-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <TaskList
                      dataList={dataList}
                      deleteTask={deleteTask}
                      statusHandle={statusHandle}
                    />
                  </tbody>
                </Table>
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

const TaskList = (props) => {
  const renderDataList = props.dataList.map((data) => {
    return (
      <Task
        key={data._id}
        data={data}
        taskValue={props.taskValue}
        deleteTask={props.deleteTask}
        getTask={props.getTask}
        statusHandle={props.statusHandle}
      />
    );
  });
  return <>{renderDataList}</>;
};

const Task = (props) => {
  const [modal, setModal] = useState(false);
  const handleClick = () => {
    setModal(true);
  };

  return (
    <>
      <tr>
        <EditModalComponent
          show={modal}
          onHide={() => {
            setModal(false);
          }}
          value={props.data._id}
        />

        <th scope="row">
          {props.data.status ? (
            <Button
              size="sm"
              variant="outline-success"
              type="button"
              className="btn rounded-pill"
              onClick={() => {
                props.statusHandle(props.data._id, props.data.status);
              }}
            >
              <AiOutlineCheck />
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline-secondary"
              type="button"
              className="btn btn-status rounded-pill"
              onClick={() => {
                props.statusHandle(props.data._id, props.data.status);
              }}
            >
              <AiOutlineCheck />
            </Button>
          )}
        </th>
        <td
          style={
            props.data.status
              ? { textDecoration: "line-through", color: "#c4cbb7" }
              : { textDecoration: "none" }
          }
        >
          {props.data.name}
        </td>
        <td
          style={
            props.data.status
              ? { textDecoration: "line-through", color: "#c4cbb7" }
              : { textDecoration: "none" }
          }
        >
          {props.data.description}
        </td>
        <td>{props.data.date}</td>
        <td>
          <Container>
            <Row>
              <Col sm={2} className="mr-1">
                <Button
                  size="sm"
                  variant="outline-primary"
                  type="button"
                  onClick={handleClick}
                  className="btn mr-1 rounded-pill mb-2"
                >
                  <AiOutlineEdit />
                </Button>
              </Col>
              <Col sm={2} className="mr-1">
                <Button
                  size="sm"
                  variant="outline-danger"
                  type="button"
                  className="btn rounded-pill"
                  onClick={() => {
                    props.deleteTask(props.data._id);
                  }}
                >
                  <AiOutlineDelete />
                </Button>
              </Col>
            </Row>
          </Container>
        </td>
      </tr>
    </>
  );
};

export default App;
