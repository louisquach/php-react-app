import React, {Component, createContext} from 'react';
import axios from 'axios';

export const TodoContext = createContext();

class TodoContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
        this.read();
    }
    //create
    createTodo(todo) {
        let array = [...this.state.todos]
        axios.post('/api/todo/create', todo)
            .then( res => {
                console.log(res.data)
                array.push(res.data[0])
                this.setState({todos: array});
            })
            .catch( err => console.log(err))
    }
    //read
    read() {
        axios.get('api/todo/read')
            .then( res => this.setState({todos: res.data}))
            .catch( err => {console.error(err)})
    }
    //update
    updateTodo(updatedTodo) {

        axios.put('api/todo/update/' + updatedTodo.id, updatedTodo)
            .then ( res => {
                if (res.status === 200) {
                    let array = [...this.state.todos]
                    let updatedTask = array.find( todo => todo.id === updatedTodo.id)
                    updatedTask.task = updatedTodo.task
                    this.setState({todos: array})
                }
            })
            .catch(err => console.log(err, err.message))
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