import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route,Switch } from 'react-router-dom'
import './index.css';

import reducers from './reducer'
import Register from './container/register/register'
import Login from './container/login/login'
import Homepage from './component/homepage/homepage'
import Chat from './component/chat/chat'
//import Linkman from './component/linkman/linkman' 
import './config'


const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDOM.render(
	(<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route path='/login' component={Login}/>
				<Route path='/register' component={Register}/>
				<Route path="/chat/:user" component={Chat}/>
				<Route component={Homepage}/>
			</Switch>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)
