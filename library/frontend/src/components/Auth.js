import React from "react"


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {login: '', password: ''}
    } 


    handleChange(Event) 
    {
        this.setState (
            {
                [Event.target.name]: Event.target.value
            }
        );
    }

    handSubmit(Event) 
    {
        this.props.get_token(this.state.login, this.state.password)
        Event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(Event)=> this.handSubmit(Event)}>
                <input type="text" name="login" placeholder="login" value={this.state.login} 
                onChange={(Event)=> this.handleChange(Event)} />
                <input type="password" name="password" placeholder="password" value={this.state.password} 
                onChange={(Event)=> this.handleChange(Event)} />
                <input type="submit" value="Login" />
            </form>
        );
    } 
}

export default LoginForm
