//个人信息
import React from 'react'
import {connect} from 'react-redux'
import {Result,WhiteSpace,List,Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
@connect(
	state=>state.user
)
class User extends React.Component{

	constructor(props){
		super(props)
		this.logout=this.logout.bind(this)
	}

	logout(){
		const alert=Modal.alert
		alert('注销','确认退出登录吗？',[
			{text:'取消',onPress:()=>console.log('cancel')},
			{text:'确认',onPress:()=>{
				browserCookie.erase('userid')//删除cookie
				window.location.href=window.location.href//跳转
			}}
		])
	}
	render(){
		console.log(this.props)
		const props=this.props

		return props.username?(
			<div>
				<Result
					img={<img src={null} style={{width:50}} alt="" />}//头像暂时没有
					title={props.username}
					message={props.username}
				/>
				<p>个人资料</p>
				<WhiteSpace></WhiteSpace>
				<List>
					<List.Item onClick={this.logout}>退出登陆</List.Item>
				</List>
			</div>
		):null
	}
}


export default User