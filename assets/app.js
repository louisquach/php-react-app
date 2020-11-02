import React, {Component} from 'react';
import ReactDom from 'react-dom';
import TodoContextProvider from "./context/todoContext";
import TodoTasks from "./components/TodoTask";

class App extends Component {
    render() {
        return (
            <div>
                <TodoContextProvider>
                    <TodoTasks/>
                </TodoContextProvider>
            </div>
        );
    }
}
ReactDom.render(<App/>,document.getElementById('root'));