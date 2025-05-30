import express from 'express'
import { registerUser } from './mongo.js'

const app = express()
app.use(express.json())

app.post('/register', async (req, res) => {
  const { email, password } = req.body

  const success = await registerUser(email, password)
  if (success) {
    res.status(201).send('Usuário registrado!')
  } else {
    res.status(400).send('Erro ao registrar usuário.')
  }
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
