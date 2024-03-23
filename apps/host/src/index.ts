import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import { createServer } from 'http'
import { resolve } from "path";
import config from '../config/server.json'
import router from './route'

const app = express()
const httpServ = createServer(app)
// Serve the index.html file
app.get("/", (req, res) => res.sendFile(resolve(__dirname, './index.html')))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())
app.use(cors())

app.use(router)

httpServ.listen(config.SERVER_PORT, () => console.log(`Host running at http://localhost:${config.SERVER_PORT} go to /front/ or /back/`))
