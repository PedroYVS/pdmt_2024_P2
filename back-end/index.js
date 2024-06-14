import express from 'express'
import dotenv from 'dotenv'
import axios from 'axios'
import cors from 'cors'

const server = express()
server.use(express.json())
server.use(cors())

dotenv.config({ path: '../front-end/.env.development' })
const PORT = process.env.EXPO_PUBLIC_SERVER_PORT

server.get('/cats', async (req, res) => {
    const pars = req.query
    try {
        const { data } = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${pars.n_pics}`, {
            headers: {
                'x-api-key': pars.api_key
            }
        })
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

server.listen(PORT, () => { console.log(`Servidor rodando na porta: ${PORT}`) })