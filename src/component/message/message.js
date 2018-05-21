import React from 'react'
import axios from 'axios'
import {List,Badge} from 'antd-mobile';
import {connect} from 'react-redux'
import {loadData} from '../../redux/user_redux'

@connect(
	state=>state,
	{loadData}
)

class Message extends React.Component{//获取消息列表的组件
	getLastMsg(arr){//获取最后一条聊天信息
		return arr[arr.length-1]
	}
	componentDidMount(){
		console.log(11)
		axios.post('/user/info')
			.then(res=>{
				if (res.status==200) {
					if (res.data.code==0) {
						// 有登录信息de'
						this.props.loadData(res.data.data)
					}else{
						this.props.history.push('/login')
					}
				}
			})
	}
	render(){
		const Item = List.Item
		const Brief = Item.Brief
		const userid=this.props.user._id
		console.log(this.props)
		const msgGroup={}
		this.props.chat.chatmsg.forEach(v=>{
			msgGroup[v.chatid]=msgGroup[v.chatid]||[]
			msgGroup[v.chatid].push(v)
		})


		const chatList=Object.values(msgGroup).sort((a,b)=>{//最新消息排序
			const alast=this.getLastMsg(a).create_time
			const blast=this.getLastMsg(b).create_time
			return blast-alast
		})

		return(
			<div>
					{chatList.map(v=>{
						const lastItem=this.getLastMsg(v)
						const targetId=v[0].from==userid?v[0].to:v[0].from
						const unreadNum=v.filter(v=>!v.read&&v.to==userid).length
						const name=this.props.chat.users[targetId]?this.props.chat.users[targetId].name:''

						//const name=this.props.chat.users[targetId]?this.props.chat.users[targetId].name:''头像类似操作
							return(
								<List key={lastItem._id}>
									<Item
										extra={<Badge text={unreadNum}></Badge>}
										arrow="horizontal"
										onClick={()=>{
											this.props.history.push(`/chat/${targetId}`)
										}}
									>
										{lastItem.content}
										<Brief>{name}</Brief>
									</Item>
								</List>
							)
					})}
			</div>
		)
	}
}
export default Message
