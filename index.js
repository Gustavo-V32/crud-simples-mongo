//imports
const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
//config.
const PORT = 3000;
const app = express()
//banco de dados
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME

mongoose.connect(`mongodb+srv://gustavovinicius:<RHTsfPLobWSkujon>@cluster01.rfgwsot.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01`)
.then(()=> console.log("conectado ao banco de dados"))
.catch(err => console.log("erro ao conectar no banco de dados", err))

//middlewares
app.use(express.json())

//models
const ITEM = mongoose.model('item', { nome: String})

//rotas
//add
app.post('/item', async(req, res) =>{
    const item = new ITEM(req.body)
    const itemAdicionado = await item.save()
    res.status(201).json(itemAdicionado)
})

//busca
app.get('/item', async(req, res) =>{
    const item = await ITEM.find()
    res.json(item)
})

//busca por id
app.get('/item/:id', async(req, res) =>{
    const item = await ITEM.findById(req.params.id)
    res.json(item)
})

//delete
app.delete('/item/:id', async(req, res) =>{
    await ITEM.findByIdAndDelete(req.params.id)
    res.json({mensagem:"item da lista deletado"})
})

//update
app.put('/item/:id', async(req, res) =>{
    const itemAtualizado = await ITEM.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.json(itemAtualizado);
})

app.listen(PORT, () =>{
    console.log("Api rodadando na porta 3000")
})