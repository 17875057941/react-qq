const express=require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app=express();
const model = require('./mongo/mongo')
const Chat = model.getModel('chat')

// app.use(cookieParser())
// app.use(bodyParser.json())
// app.use('/user',require('./router/user'))

// app.listen(9093,function(){
// 	console.log('you are listening port 9093')
// });
const server =require('http').Server(app)
const io=require('socket.io')(server)

io.on('connection',function(socket){
	socket.on('sendmsg',function(data){//监听发来的信息

		console.log(data)
		const {from,to,msgs}=data
		const chatid=[from,to].sort().join('_')
		Chat.create({chatid,from,to,content:msgs},function(err,doc){
			//console.log(Object.assign({},doc.doc))
			io.emit('recvmsg', Object.assign({},doc._doc))//光波信息到全局

		})
	})
})


app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',require('./router/user'))
server.listen(9093,function(){
	console.log('Node app start at port 9093')
})



