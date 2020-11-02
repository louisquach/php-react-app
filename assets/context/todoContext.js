import React, {Component, createContext} from 'react';
import axios from 'axios';

export const TodoContext = createContext();

class TodoContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [{id:1, task: 'Welcome to Todo-App!'}]
        }
        this.read();
    }
    //create
    createTodo(todo) {
        let array = [...this.state.todos]
        array.push(todo)
        this.setState(this.state.todos= array);
    }
    //read
    read() {
        axios.get('api/todo/read')
            .then( res => this.setState({todos: [...this.state.todos,res.data]}))
            .catch( err => {console.error(err)})
    }
    //update
    updateTodo(updatedTodo) {
        let array = [...this.state.todos]
        let updatedTask = array.find( todo => todo.id === updatedTodo.id)
        updatedTask.task = updatedTodo.task
        this.setState({todos: array})
    }

    //delete
    deleteTodo(taskId) {
        let array = this.state.todos.filter( todo => todo.id !== taskId)
        this.setState({todos: array})
    }

    render() {
        return (
            <TodoContext.Provider
                value={{...this.state,
                        createTodo: this.createTodo.bind(this),
                        updateTodo: this.updateTodo.bind(this),
                        deleteTodo: this.deleteTodo.bind(this)
                }}
            >
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}

export default TodoContextProvider;