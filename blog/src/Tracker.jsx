import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const TaskTrackerApp = () => {
  const [title, settitle] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (title.trim() !== '') {
      try {
        const response = await axios.post('/api/tasks', { title: title });
        setTasks([...tasks, response.data]);
        settitle('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const completeTask = async (taskId) => {
    try {
      await axios.put(`/api/tasks/${taskId}`);
      setTasks(tasks.map((task) => {
        if (task._id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      }));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="dark-edition">
      <div className="main-panel">
        <div className="content">
          <Container>
            <Row>
              <Col lg={8} md={12} xs={12}>
                <div className="card" style={{marginTop: "150px", marginLeft: "200px", marginRight: "50px"}}>
                  <div className="card-header card-header-primary">
                    <h4 className="card-title text-center"><b>Task Tracker</b></h4>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive ps">
                      <table className="table tablesorter table-hover">
                        <thead className="text-primary">
                          <tr>
                            <th>
                              <Col md={12} sm={6}>
                                <Form.Group>
                                  <Form.Control
                                    type="text"
                                    value={title}
                                    onChange={(e) => settitle(e.target.value)}
                                    className="form-control"
                                    style={{ fontSize: '25px' }}
                                    placeholder="New Task"
                                    required
                                  />
                                </Form.Group>
                              </Col>
                            </th>
                            <th>
                              <Button
                                variant="success"
                                className="btn-sm col-md-12 col-xsm-2"
                                style={{ width: '100px' }}
                                onClick={addTask}
                              >
                                Add Task
                              </Button>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {tasks.map((task) => (
                            <tr key={task._id}>
                              <td>{task.title}</td>
                              <td>
                                <Button
                                  variant="info"
                                  className="btn-link btn-sm"
                                  data-original-title={task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                                  onClick={() => completeTask(task._id)}
                                >
                                  <i className="material-icons">{task.completed ? 'done' : 'check'}</i>
                                  <div className="ripple-container" />
                                </Button>
                                <Button
                                  variant="danger"
                                  className="btn-link btn-sm"
                                  data-original-title="Delete"
                                  onClick={() => deleteTask(task._id)}
                                >
                                  <i className="material-icons">delete</i>
                                  <div className="ripple-container" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="ps__rail-x" style={{ left: '0px', bottom: '0px' }}>
                        <div className="ps__thumb-x" tabIndex={0} style={{ left: '0px', width: '0px' }} />
                      </div>
                      <div className="ps__rail-y" style={{ top: '0px', right: '0px' }}>
                        <div className="ps__thumb-y" tabIndex={0} style={{ top: '0px', height: '0px' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default TaskTrackerApp;
