import React from 'react'
import { Link } from 'react-router-dom'


const AuthorItem = ({ item }) => {
    return (
        <tr>
            <td>
                <Link to={`author/${item.id}`}>{item.id}</Link>
            </td>
            <td>
                {item.first_name}
            </td>
            <td>
                {item.last_name}
            </td>
            <td>
                {item.birthday_year}
            </td>
        </tr>
    )
}


const AuthorList = ({ items }) => {
    return (
        <table>
            <th>
                ID
            </th>
            <th>
                First name
            </th>
            <th>
                Last name
            </th>
            <th>
                Birthday year
            </th>
            {items.map((item) => <AuthorItem item={item} />)}
        </table>
    )
}

export default AuthorList
