import express from "express"
import hbs from "hbs"

const app = express()
app.set("view engine", "hbs")
app.use(express.static("./views/public"))
hbs.registerPartials("views/partial")
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))

//import routes
import userRouter from "./routes/user.router.js"

app.use("", userRouter)

export {app}