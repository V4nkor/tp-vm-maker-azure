import express from "express"
import routerFront from './front'
import routerBack from './back'

const app = express.Router()

app.use("/front", routerFront)
app.use("/back", routerBack)

export default app
