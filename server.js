import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { registerUser } from './mongo.js'

const app = express()

// Necessário para ESModules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Servir arquivos estáticos (index.html, style.css)
app.use(express.static(__dirname))

// Página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// Rota de registro
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
