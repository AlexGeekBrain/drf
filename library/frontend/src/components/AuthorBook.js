import React from 'react'
import { useParams } from 'react-router-dom'


const BookItem = ({ item }) => {
    return (
        <tr>
            <td>
                {item.id}
            </td>
            <td>
                {item.name}
            </td>
            <td>
                {item.author.last_name}
            </td>
        </tr>
    )
}


const BookList = ({ items }) => {

    let {id} = useParams();
    let filter_items = items.filter((item) => item.author.id == id)
    return (
        <table>
            <th>
                ID
            </th>
            <th>
                Name
            </th>
            <th>
                Author
            </th>
            {filter_items.map((item) => <BookItem item={item} />)}
        </table>
    )
}

export default BookList
