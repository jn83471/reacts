import express from "express";
import prueba from "./prueba.js";
import { conectarDb } from "./config/db.js";
import dotenv from "dotenv"
import cors from "cors"

import UsersRoutes from "./routes/UsersRoutes.js"
import ProyectsRoutes from "./routes/ProyectRoutes.js"
import TaskRoutes from "./routes/TaskRoutes.js"

const app = express()
app.use(express.json());
dotenv.config();
const port = process.env.Express_Port

//routing 

/*app.get("/",(req,res)=>{
  return res.send("Hola esta es una prueba");
})*/



conectarDb();

//configurar cors
const whiteList = [process.env.FRONTEND_URL]

const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin)
    if (whiteList.includes(origin)) {
      //puede
      callback(null, true);
    }
    else {
      callback(new Error("Error de Cors"));
    }
  },
}
app.use(cors(corsOptions));

app.use("/api/users", UsersRoutes)
app.use("/api/proyects", ProyectsRoutes)
app.use("/api/tasks", TaskRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port} ${prueba}`)

})