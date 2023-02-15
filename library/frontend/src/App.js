import React from 'react'
import axios from 'axios'
import './App.css';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie'

import AuthorList from './components/Author.js'
import BookList from './components/Books.js'
import AuthorBookList from './components/AuthorBook.js'

import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import ToDoList from './components/ToDo.js'
import ProjectToDoList from './components/ProjectTodo.js'
import LoginForm from './components/Auth.js'
import ProjectForm from './components/ProjectForm.js'
import TodoForm from './components/TodoForm.js'


const NotFound404 = ({ location }) => {
  return (
    <div>
      <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'todos': [],
      'token': ''
    }
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({'token': token}, () => this.load_data())
  }

  is_authenticated() {
    return this.state.token != ''
  }

  logout() {
    this.set_token('')
  }

  createProject(name, user) {
    const headers = this.get_headers()
    const data = {name: name, user: user}
    axios.post(`http://127.0.0.1:8000/api/project/`, data, {headers})
    .then(response => {
    let new_project = response.data
    const user = this.state.users.filter((user) => user.id === new_project.user)[0]
    new_project.user = user
    this.setState({projects: [...this.state.projects, new_project]})
    }).catch(error => console.log(error))
    }

  deleteProject(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/project/${id}`, {headers})
    .then(response => {
    this.setState({projects: this.state.projects.filter((project)=>project.id !== id)})
    }).catch(error => console.log(error))
  }

  createTodo(title, content, closed, user, project) {
    const headers = this.get_headers()
    const data = {title: title, content: content, closed: closed, user: user, project: project}
    axios.post(`http://127.0.0.1:8000/api/todolist/`, data, {headers})
    .then(response => {
    let new_todo = response.data
    const user = this.state.users.filter((user) => user.id === new_todo.user)[0]
    const project = this.state.projects.filter((project) => project.id === new_todo.project)[0]
    new_todo.user.project = {user, project}
    this.setState({todos: [...this.state.todos, new_todo]})
    }).catch(error => console.log(error))
    }

  deleteTodo(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/todolist/${id}`, {headers})
    .then(response => {
    this.setState({todos: this.state.todos.filter((todo)=>todo.id !== id)})
    }).catch(error => console.log(error))
  }

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({'token': token}, () => this.load_data())
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
    .then(response => {
      this.set_token(response.data['token'])
    }).catch(error => alert('Неверный логин или пароль'))
  }

  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
    if (this.is_authenticated())
    {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  } 

  load_data() {
    const headers = this.get_headers()

    axios.get('http://127.0.0.1:8000/api/users', {headers})
      .then(response => {
        this.setState({users: response.data})
      }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/project', {headers})
      .then(response => {
        this.setState({projects: response.data})
      }).catch(error => console.log(error))
      
    axios.get('http://127.0.0.1:8000/api/todolist', {headers})
      .then(response => {
        this.setState({todos: response.data})
      }).catch(error => console.log(error))
  }

  componentDidMount() {
    this.get_token_from_storage()
  }

  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to='/'>Users</Link>
              </li>
              <li>
                <Link to='/projects'>Project</Link>
              </li>
              <li>
                <Link to='/todolist'>ToDo</Link>
              </li>
              <li>
                {this.is_authenticated() ? <button onClick={() => this.logout()}>Logout</button> : 
                <Link to='/login'>Login</Link>}
              </li>
            </ul>
          </nav>
            <Switch>
              <Route exact path='/' component={() => <UserList users={this.state.users} />} />
              <Route exact path='/projects/create' component={() => <ProjectForm users={this.state.users} 
              createProject={(name, user) => this.createProject(name, user)} />} />
              <Route exact path='/todolist/create' component={() => <TodoForm users={this.state.users}
              projects={this.state.projects} createTodo={(title, content, closed, user, project) => 
              this.createTodo(title, content, closed, user, project)} />} />
              <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} 
              deleteProject={(id)=>this.deleteProject(id)} />} />
              <Route exact path='/todolist' component={() => <ToDoList todos={this.state.todos} 
              deleteTodo={(id)=>this.deleteTodo(id)} />} />
              <Route exact path='/login' component={() => <LoginForm get_token={(username, password) =>
              this.get_token(username, password)} />} />
              <Route path='/project/:id'>
                <ProjectToDoList todos={this.state.projects} />
              </Route>
              <Redirect from='/users' to='/' />
              <Route component={NotFound404} />
            </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;


// class App extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       'authors': [],
//       'books': []
//     }
//   }

//   componentDidMount() {
//     axios.get('http://127.0.0.1:8000/api/authors')
//       .then(response => {
//         const authors = response.data
//         this.setState(
//           {
//             'authors': authors
//           }
//         )
//       }).catch(error => console.log(error))

//       axios.get('http://127.0.0.1:8000/api/books')
//       .then(response => {
//         const books = response.data
//         this.setState(
//           {
//             'books': books
//           }
//         )
//       }).catch(error => console.log(error))
//   }

//   render() {
//     return (
//       <div className='App'>
//         <BrowserRouter>
//           <nav>
//             <ul>
//               <li>
//                 <Link to='/'>Authors</Link>
//               </li>
//               <li>
//                 <Link to='/books'>Books</Link>
//               </li>
//             </ul>
//           </nav>
//             <Switch>
//               <Route exact path='/' component={() => <AuthorList items={this.state.authors} />} />
//               <Route exact path='/books' component={() => <BookList items={this.state.books} />} />
//               <Route path='/author/:id'>
//                 <AuthorBookList items={this.state.books} />
//               </Route>
//               <Redirect from='/authors' to='/' />
//               <Route component={NotFound404} />
//             </Switch>
//         </BrowserRouter>
//       </div>
//     )
//   }
// }

// export default App;
