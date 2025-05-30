import { MongoClient } from 'mongodb'

const uri = 'mongodb+srv://usuario:senha@cluster0.mongodb.net/meuBanco?retryWrites=true&w=majority'

const client = new MongoClient(uri)

export async function registerUser(email, password) {
  try {
    await client.connect()
    const db = client.db('meuBanco')
    const usuarios = db.collection('usuarios')

    const existingUser = await usuarios.findOne({ email })
    if (existingUser) {
      console.log('Usuário já existe!')
      return false
    }

    await usuarios.insertOne({ email, password })

    console.log('Usuário registrado com sucesso!')
    return true
  } catch (err) {
    console.error('Erro ao registrar usuário:', err)
    return false
  } finally {
    await client.close()
  }
}
