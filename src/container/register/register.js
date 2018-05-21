import React from 'react'
import {connect} from 'react-redux'
import { List, InputItem, WhiteSpace,Button} from 'antd-mobile';
import {regisger} from '../../redux/user_redux'
import {Redirect} from 'react-router-dom'
@connect(
	state=>state.user,
	{regisger}
)
	
class Register extends React.Component{
	constructor(props){
		super(props);
		this.state={
			username:'',
			pwd:'',
			repwd:''
		}
	}
	handleChange(key,val){
		this.setState({
			[key]:val
		})
	}
	handleRegister(){
		this.props.regisger(this.state)
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
					<InputItem onChange={v=>this.handleChange('repwd',v)}>确认密码</InputItem>
					<WhiteSpace/>
					<Button type="primary" onClick={this.handleRegister.bind(this)}>注册</Button>
				</List>
			</div>
		)
	}
}
export default Register;