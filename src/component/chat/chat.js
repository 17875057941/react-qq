import React from 'react'
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../redux/chat_redux'

function getChatId(userId, targetId){//唯一标识，过滤
	return [userId, targetId].sort().join('_')
}
const socket=io('ws://localhost:9093')

@connect(
	state=>state,
	{getMsgList,sendMsg,recvMsg,readMsg}
)
class Chat extends React.Component{
	constructor(props){
		super(props)
		this.state={
			text:'',
			msg:[],
			showEmoji:false
		}
	}

	componentDidMount(){
		if(!this.props.chat.chatmsg.length){
			this.props.getMsgList()//获取消息列表
			this.props.recvMsg()//监听接收消息
		}
	}

	componentWillUnmount(){
		const to=this.props.match.params.user//聊天目标
		this.props.readMsg(to)
	}
	fixCarousel(){
		setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
		},0)
	}
	handleSubmit(){
		const from=this.props.user._id
		const to=this.props.match.params.user
		const msgs=this.state.text
		this.props.sendMsg({from,to,msgs})
		this.setState({text:''})
	}

	render(){
		const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
										.map(v=>({text:v}))
		const userid=this.props.match.params.user
		const Item=List.Item
		const users=this.props.chat.users
		if(!users[userid]){
			return null
		}
		const chatid=getChatId(userid,this.props.user._id)//一对一聊天id
		const chatmsgs=this.props.chat.chatmsg.filter(v=>v.chatid===chatid)
		return(
			<div id='chat-page'>
				<NavBar mode='dark'
					icon={<Icon type="left"/>}
					onLeftClick={()=>{
						this.props.history.goBack()
					}}
				>
					{users[userid].name}
				</NavBar>

				{chatmsgs.map(v=>{
					
					return v.from===userid?(
						<List key={v._id}>
							<Item
								
							>{v.content}</Item>
						</List>	
					):(
						<List key={v._id}>
							<Item 
								extra={'avatar'}
								className="chat-me">{v.content}</Item>
						</List>	
					)
				})}
				<div className="stick-footer">
					<List>
						<InputItem
							placeholder="请输入"
							value={this.state.text}
							onChange={v=>{
								this.setState({text:v})
							}}
							extra={
								<div>
									<span style={{marginRight:15}}
										onClick={()=>{
											this.setState({
												showEmoji:!this.state.showEmoji
											})
											this.fixCarousel()
										}}
									>😅</span>
									<span onClick={()=>this.handleSubmit()}>发送</span>
								</div>
							}
						>
						信息
						</InputItem>
					</List>
					{this.state.showEmoji?<Grid 
						data={emoji}
						columNum={9}
						carouselMaxRo={4}
						isCarousel={true}
						onClick={el=>{
							this.setState({
								text:this.state.text+el.text
							})
						}}
						/>
						:null}
				</div>
			</div>
		)
	}
}

export default Chat