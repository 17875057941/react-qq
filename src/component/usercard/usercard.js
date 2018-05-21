import React from 'react'
import {connect} from 'react-redux'
import {Card,WhiteSpace,WingBlank} from 'antd-mobile'
import {getUserList} from '../../redux/chatuser_redux'

@connect(
	state=>state.chatuser,
	{getUserList}
)
class Usercard extends React.Component{
	constructor(props){
		super(props)
		this.state={
			data:[]
		}
	}
	componentWillMount(){
		this.props.getUserList()
	}

	handleClick(v){
		this.props.history.push(`/chat/${v._id}`)
	}

	render(){
		return(
			<WingBlank onClick={this.handleClick.bind(this)}>
				    <WhiteSpace size="lg" />
				    {this.props.userlist.map(v=>(
				    	<Card key={v._id} onClick={()=>this.handleClick(v)}>
					      <Card.Header
					        title={v.username}
					        thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
					        extra={<span>{v.title}</span>}
					      />
					    </Card>
				    ))}
			</WingBlank>
		)
	}
}

export default Usercard