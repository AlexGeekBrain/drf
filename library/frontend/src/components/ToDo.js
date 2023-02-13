import React from 'react'
import { Link } from 'react-router-dom'


const ToDoItem = ({ todo, deleteTodo }) => {
    return (
        <tr>
            <td>
                {todo.id}
            </td>
            <td>
                {todo.title}
            </td>
            <td>
                {todo.content}
            </td>
            <td>
                {todo.user.user_name}
            </td>
            <td>
                {todo.project.name}
            </td>
            <td>
                {todo.created_at}
            </td>
            <td><button onClick={()=>deleteTodo(todo.id)} type='button'>Delete</button></td>
        </tr>
    )
}


const ToDoList = ({ todos, deleteTodo }) => {
    return (
        <div>
        <table>
            <th>
                ID
            </th>
            <th>
                Title
            </th>
            <th>
                Content
            </th>
            <th>
                User
            </th>
            <th>
                Project
            </th>
            <th>
                Created_at
            </th>
            <th></th>
            {todos.map((todo) => <ToDoItem todo={todo} deleteTodo={deleteTodo} />)}
        </table>
        <Link to='/todolist/create'>Create</Link>
        </div>
    )
}

export default ToDoList
