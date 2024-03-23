import express from "express";
import { resolve } from "path";

const app = express.Router()

app.use(express.static(resolve(__dirname, '../front/dist')))
app.get("*", (req, res) => res.sendFile(resolve(__dirname, '../front/dist/index.html')))

export default app
