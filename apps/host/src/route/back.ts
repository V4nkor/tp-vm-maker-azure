import express from "express";
import { resolve } from "path";

const app = express.Router()

app.use(express.static(resolve(__dirname, '../back/dist')))
app.get("*", (req, res) => res.sendFile(resolve(__dirname, '../back/dist/index.js')))

export default app
