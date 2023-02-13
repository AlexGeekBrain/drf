import React from 'react'
import { Link } from 'react-router-dom'


const ProjectItem = ({ project, deleteProject }) => {
    return (
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                {project.name}
            </td>
            <td>
                {project.link}
            </td>
            <td>
                {project.users.user_name}
            </td>
            <td><button onClick={()=>deleteProject(project.id)} type='button'>Delete</button></td>
        </tr>
    )
}


const ProjectList = ({ projects, deleteProject }) => {
    return (
        <div>
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Link</th>
                <th>User</th>
                <th></th>
            </tr>
            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
        </table>
        <Link to='/projects/create'>Create</Link>
        </div>
    )
}

export default ProjectList
