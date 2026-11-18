const express = require('express')
const taskRouter = require('./routes/tasks')

const app = express()

app.use(express.json())

app.use((req,res,next)=>{
    const startedAt = new Date

    res.on('finish', ()=>{
        console.log(`${startedAt.toISOString()} - ${req.method} ${req.originalUrl}`)
    })

    next()
})

app.get("/", (req, res)=>{
    res.json({massage: "hello world"})
})

app.use('/api/tasks', taskRouter)
app.use((req,res)=>{
    res.status(404).json({erorr: `abvgd ${req.originalUrl} not found`})
})
module.exports = app