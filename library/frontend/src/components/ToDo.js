import React from 'react'


const ToDoItem = ({ todo }) => {
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
        </tr>
    )
}


const ToDoList = ({ todos }) => {
    return (
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
            {todos.map((todo) => <ToDoItem todo={todo} />)}
        </table>
    )
}

export default ToDoList
