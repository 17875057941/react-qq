
import axios from 'axios'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCESS = 'LOGIN_SUCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const initState={
	username:'',
	msg:'',
	redirectTo:''
}
// reducer
function getRedirectPath(flag){
	if(flag.username){
		return '/message'
	}
	return null
}
export function user(state=initState, action){
	switch(action.type){
		case REGISTER_SUCCESS:
			return {...state, msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
		case LOAD_DATA:
			return {...state, ...action.payload}
		case ERROR_MSG:
			return {...state,msg:action.msg}
		default:
			return state
	}
} 

function registerSuccess(data){
	return { type:REGISTER_SUCCESS, payload:data}
}
function loginSuccess(data){
	return { type:REGISTER_SUCCESS , payload:data}
}
function errorMsg(msg){
	return { msg, type:ERROR_MSG }
}

export function loadData(userinfo){
	return { type:LOAD_DATA, payload:userinfo}
}
export function login({username,pwd}){
	if (!username||!pwd) {
		return errorMsg('用户密码必须输入')
	}
	return dispatch=>{
		axios.post('/user/login',{username,pwd})
			.then(res=>{
				if (res.status===200&&res.data.code===0) {
					dispatch(loginSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})		
	}
}

export function regisger({username,pwd,repwd}){
	if (!username||!pwd) {
		return errorMsg('用户名密码必须输入')
	}
	if (pwd!==repwd) {
		return errorMsg('密码和确认密码不同')
	}
	return dispatch=>{
		axios.post('/user/register',{username,pwd})
			.then(res=>{
				if (res.status===200&&res.data.code===0) {
					dispatch(registerSuccess({username,pwd}))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})		
	}

}





