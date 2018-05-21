
import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
@withRouter

@connect(
	state=>state.chat
)
class Navlink extends React.PureComponent{
	static propTypes = {
		data: PropTypes.array.isRequired
	}
	render(){
		
		const navList = this.props.data.filter(v=>!v.hide)
		const {pathname} = this.props.location
		return (
			<TabBar>
				{navList.map(v=>(
					<TabBar.Item
						badge={v.path=='/message'?this.props.unread:null}
						key={v.path}
						title={v.text}
						icon={{uri: require(`./img/${v.icon}.png`)}}
						selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
						selected={pathname===v.path}
						onPress={()=>{
							this.props.history.push(v.path)
						}}
					>
					
					</TabBar.Item>
				))}
			</TabBar>
		)
	}
}

export default Navlink