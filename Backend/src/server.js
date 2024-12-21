import app from "./app.js";
import { connectDB } from "../db/db.js";
import authRouter from "../routes/auth.routes.js";
import userRouter from "../routes/user.routes.js";
import postRouter from "../routes/post.routes.js";
import { PORT } from "./config.js";
import swaggerIU from "swagger-ui-express"
import swaggerDocument from "./swagger.json" assert {type:"json"}
import { logger } from "../config/Winston.js"
import express from "express";

// configuracion winston
app.use((req ,res, next) => {
  logger.info(`${req.metod} ${req.url}`)
  next()
})

connectDB();
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use("/docs",swaggerIU.serve,swaggerIU.setup(swaggerDocument))

app.listen(PORT, () => {
    console.log(`Server corriendo en: http://localhost:${PORT}`);
    
  });
  
  app.get("/", (req, res) => {
    res.json("¡Bienvenido al backend!");
    
  });