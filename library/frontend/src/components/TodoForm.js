import React from 'react'


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            title: '',
            content: '',
            closed : false, 
            users: props.users[0]?.id,
            project: props.projects[0]?.id,
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createTodo(this.state.title, this.state.content,  
            this.state.closed, this.state.users, this.state.project)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" name="title"
                        value={this.state.title} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label htmlFor='content'>Content</label>
                    <input type="text" className="form-control" name="content"
                        value={this.state.content} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label htmlFor='closed'>Closed</label>
                    <input type="checkbox" className="form-control" name="closed"
                        value={this.state.closed} checked onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label htmlFor="users">User</label>
                    <select name="users" className='form-control' onChange={(event)=>this.handleChange(event)}>
                    {this.props.users.map((user)=><option value={user.id}>{user.user_name}</option>)} </select>
                </div>
                <div className="form-group">
                    <label htmlFor="project">Project</label>
                    <select name="project" className='form-control' onChange={(event)=>this.handleChange(event)}>
                    {this.props.projects.map((project)=><option value={project.id}>{project.name}</option>)} </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default TodoForm
