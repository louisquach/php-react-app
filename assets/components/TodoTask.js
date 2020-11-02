import React, {Component, useContext, useEffect, useState} from 'react';
import {TodoContext} from "../context/todoContext";
import {Table} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import TableRow from "@material-ui/core/TableRow";
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import BlockIcon from '@material-ui/icons/Block';
import DeleteDialog from "./DeleteDialog";

const TodoTasks = () => {
        const context = useContext(TodoContext)
        const [todo, setTodo] = useState('')
        const [toggleEdit, setToggleEdit] = useState(false)
        const [editContent, setEditContent] = useState('')
        const [showDialog, setShowDialog] = useState(false)
        const [deleteId, setDeleteId] = useState(null)

        const newTodo = event => {
            const newTask = event.target.value;
            setTodo(newTask);
        }

        const addTodo = () => {
            context.createTodo({task: todo});
            setTodo('')
        }

        const editToggle = (todo) => {
            setToggleEdit(todo.id);
            setEditContent(todo.task)
        }
        const editChange = (event) => {
            const editedTask = event.target.value;
            setEditContent(editedTask);
        }
        const updateTask = (todo) => {
            context.updateTodo({id: todo.id, task:editContent});
            setEditContent('');
            setToggleEdit(false)
        }

        const deleteTodo = () => {
            context.deleteTodo(deleteId);
            setShowDialog(false)
        }

        return (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align={'left'}>
                                Name
                            </TableCell>

                            <TableCell align={'center'}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell align={'left'}>
                                <TextField onChange={newTodo} value={todo} fullWidth={true}/>
                            </TableCell>

                            <TableCell align={'center'}>
                                <IconButton onClick={addTodo}>
                                    <AddIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>

                            {context.todos.slice().reverse().map( (todo,index) =>
                                <TableRow key={index}>
                                <TableCell align={'left'}>
                                    {
                                        toggleEdit === todo.id ?
                                               <TextField
                                                    value={editContent}
                                                    fullWidth={true}
                                                    onChange={editChange}
                                                    InputProps={{
                                                        endAdornment: <React.Fragment>
                                                            <IconButton onClick={() => updateTask(todo)}>
                                                                <DoneIcon/>
                                                            </IconButton>

                                                            <IconButton onClick={() => setToggleEdit(false)}>
                                                                <BlockIcon/>
                                                            </IconButton>
                                                        </React.Fragment>
                                                    }}
                                               />
                                        : todo.task
                                    }
                                </TableCell>
                                <TableCell align={'center'}>
                                    <IconButton onClick={() => editToggle(todo)}>
                                        <EditIcon/>
                                    </IconButton>

                                    <IconButton onClick={ () =>{setShowDialog(true); setDeleteId(todo.id)}}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>)
                            }

                        {showDialog &&
                            <DeleteDialog
                                setShowDialog={() => setShowDialog(false)}
                                open={showDialog}
                                deleteTask = { () => deleteTodo(todo)}
                            />
                        }
                    </TableBody>
                </Table>
        );
}

export default TodoTasks;