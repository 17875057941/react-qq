import React from 'react'
import { List, InputItem, WhiteSpace,Button} from 'antd-mobile';
import {login} from '../../redux/user_redux'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

@connect(
	state=>state.user,
	{login}
)
class Login extends React.Component{
	constructor(props){
		super(props);
		this.state={
			username:'',
			pwd:''
		}
	}
	handleLogin(){
		this.props.login(this.state)
	}

	handleRegister(){
		this.props.history.push('/register');
	}
	handleChange(key,val){
		this.setState({
			[key]:val
		})
	}
	render(){
		return(
			<div>
				{this.props.redirectTo? <Redirect to={this.props.redirectTo} />:null}
				<List>
					{this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
					<InputItem onChange={v=>this.handleChange('username',v)}>用户名</InputItem>
					<WhiteSpace/>
					<InputItem onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
					<WhiteSpace/>
					<Button type="primary" onClick={this.handleLogin.bind(this)}>登陆</Button>
					<WhiteSpace/>
					<Button type="primary" onClick={this.handleRegister.bind(this)}>注册</Button>
				</List>
			</div>
		)
	}
}
export default Login;