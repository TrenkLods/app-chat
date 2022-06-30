const express = require('express')
const app = express()
const http =require('http').createServer(app)
const io=require('socket.io')(http)
const mongoose=require('mongoose')
const authRouter=require('./controllers/authRouter')


const PORT = process.env.PORT || 3000


app.use(express.json())
app.use('/auth',authRouter)



const start = async() => {
  try{
    await mongoose.connect(`mongodb://localhost:27017/app_chat`)
    http.listen(PORT,()=>{
  console.log(`run server on port ${PORT} `)
})
 
  }catch (e){
    console.log(e)
  }



}
const db = mongoose.connection
db.once('open', () => {
  console.log('we are connected')
})



app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/dialog/index.html')
})
app.use(express.static(__dirname+'/assets'))

io.on('connection',(socket)=>{
  socket.on('chat message',(data)=>{
    io.emit('chat message',{
      message:data.message,
      name:data.name
    })
  })
})


start()