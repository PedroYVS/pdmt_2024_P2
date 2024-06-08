import express from 'express'
import dotenv from 'dotenv'
import axios from 'axios'
import cors from 'cors'

const server = express()
server.use(express.json())
server.use(cors())

dotenv.config()
const { PORT, CAT_API_KEY } = process.env

server.get('/cats', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${req.query.n_pics}`, {
            headers: {
                'x-api-key': CAT_API_KEY
            }
        })
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

server.listen(PORT, () => { console.log(`Servidor rodando na porta: ${PORT}`) })