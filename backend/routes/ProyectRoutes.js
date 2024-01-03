import express from "express";
import {GetProyects,NewProyect,GetProyect,UpdateProyect,DeleteProyect,AddColaboratorProyect,DeleteColaboratorProyect} from "../controllers/ProyectController.js"
import CheckAuth from "../middleware/CheckAuth.js";

const routes=express.Router();
//routes.get("/",CheckAuth,GetProyects)
//routes.post("/",CheckAuth,GetProyects)
routes.route("/")
    .get(CheckAuth,GetProyects)
    .post(CheckAuth,NewProyect)

routes.route("/:id")
    .get(CheckAuth,GetProyect)
    .put(CheckAuth,UpdateProyect)
    .delete(CheckAuth,DeleteProyect)

routes.post("/addcolaborator/:id",CheckAuth,AddColaboratorProyect)
routes.post('/deletecolaborator/:id',CheckAuth,DeleteColaboratorProyect)

export default routes;