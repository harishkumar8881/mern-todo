import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/header/Header';
import AddTodo from './components/addtodo/AddTodo';
import TodoList from "./components/todoList/TodoList";

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      todos: []
    };
  }

  handleAddTodo = async (todo) => {
    await fetch("http://localhost:5000/todos", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(todo),
    });
    this.fetchTodos();
  }

  handleDeleteTodo = async (todo_id) => {
    await fetch("http://localhost:5000/todos", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ todo_id: todo_id }),
    });
    this.fetchTodos();
  }

  handleFinishTodo = async (todo) => {
    await fetch("http://localhost:5000/todos", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ todo_id: todo._id, newFinished: !todo.finished }),
    });
    this.fetchTodos();
  }

  fetchTodos = async () => {
    await fetch("http://localhost:5000/todos", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    })
      .then(res => res.json())
      .then(
        result => {
          console.log("fetch Result ", result);
          this.setState({ todos: result });
        }
      );

    console.log("Current state todos : ", this.state.todos);
  }

  componentDidMount() {
    this.fetchTodos();
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col xl={8}>
            <Header />
            <TodoList todos={this.state.todos} onDeleteTodo={this.handleDeleteTodo} onFinishedTodo={this.handleFinishTodo} />
            <AddTodo onAddTodo={this.handleAddTodo} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
