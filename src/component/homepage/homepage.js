import React from 'react'
import { Card, WhiteSpace,NavBar} from 'antd-mobile';
import {Route,Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import Navlink from '../navlink/navlink'
import Message from'../message/message'
import Linkman from '../linkman/linkman'
import User from '../user/user'
import {getMsgList,recvMsg} from '../../redux/chat_redux'
function Watch(){
	return <h2>看点</h2>
}
@connect(
	state=>state,
	{getMsgList,recvMsg}
)
class Homepage extends React.Component{

	componentDidMount(){
		if(!this.props.chat.chatmsg.length){
			this.props.getMsgList()//获取消息列表
			this.props.recvMsg()
		}
	}
	render(){
		const {pathname} = this.props.location
		const navList = [
			{
				path:'/message',
				text:'消息',
				icon:'message',
				title:'消息',
				component:Message
			},
			{
				path:'/linkman',
				text:'联系人',
				icon:'linkman',
				title:'联系人',
				component:Linkman
			},
			{
				path:'/watch',
				text:'发现',
				icon:'wacth',
				title:'发现',
				component:Watch
			},
			{
				path:'/dynamic',
				text:'我',
				icon:'dynamic',
				title:'我',
				component:User
			}
		]

		const page = navList.find(v=>v.path==pathname)
		return(
			<div>
				
				<NavBar className='fixd-header' mode='dard'>{page.title}</NavBar>
				<div style={{marginTop:45}}>
					<Route key={page.path} path={page.path} component={page.component}></Route>
				</div>
				<Navlink data={navList}></Navlink>
			</div>
		)
	}
}

export default Homepage