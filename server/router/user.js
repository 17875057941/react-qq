const express=require('express')
const utils = require('utility')
const Router=express.Router()
const model = require('../mongo/mongo')
const User=model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {'pwd':0,'__v':0}
//用户注册
Router.post('/register', function(req, res){
	const {username, pwd} = req.body
	User.findOne({username},function(err,doc){
		console.log(1)
		if (doc) {
			return res.json({code:1,msg:'用户名重复'})
		}
		
		const userModel = new User({username,pwd:md5Pwd(pwd)})
		userModel.save(function(e,d){
			if (e) {
				return res.json({code:1,msg:'后端出错了'})
			}
			const {username, _id} = d
			res.cookie('userid', _id)
			return res.json({code:0,data:{username, _id}})
		})
	})
})

//用户登陆
Router.post('/login',function(req,res){
	const {username,pwd}=req.body
	User.findOne({username,pwd:md5Pwd(pwd)},function(err,doc){
		if(!doc){
			return res.json({code:1,msg:'用户名不存在'})
		}
		res.cookie('userid', doc._id)
		return res.json({code:0,data:doc})
	})
})

Router.post('/info',function(req, res){
	const {userid} = req.cookies
	if (!userid) {
		return res.json({code:1})
	}
	User.findOne({_id:userid} , function(err,doc){
		if (err) {
			return res.json({code:1, msg:'后端出错了'})
		}
		if (doc) {
			return res.json({code:0,data:doc})
		}
	})
})

Router.get('/list',function(req, res){
	// User.remove({},function(e,d){})
	User.find({},function(err,doc){
		console.log(1)
		return res.json({code:0,data:doc})
	})
})

Router.get('/getmsglist',function(req,res){
	const user=req.cookies.userid

	User.find({},function(e,userdoc){
		let users={}
		console.log(userdoc)
		userdoc.forEach(v=>{
			users[v._id]={name:v.username,avatar:v.avatar}
		})

		Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
			if(!err){
				console.log(2)
				return res.json({code:0,msgs:doc,users:users})
			}
		})
	})
})


Router.post('/readmsg',function(req,res){
	const userid=req.cookies.userid
	const {from}=req.body
	Chat.update(
		{from,to:userid},
		{'$set':{read:true}},
		{'multi':true},
		function(err,doc){
		if(!err){
			return res.json({code:0,num:doc.nModified})
		}
		return res.json({code:1,msg:'修改失败'})
	})
})
function md5Pwd(pwd){//加密处理
	const salt = 'react_qq_app#@%@￥R@@#$42'
	return utils.md5(utils.md5(pwd+salt))
}
module.exports=Router;
