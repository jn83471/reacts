import express from "express";
import {GetTasks,NewTasks,DeleteTask,UpdateTask,UpdateStatus} from "../controllers/TaskController.js"
import CheckAuth from "../middleware/CheckAuth.js";

const routes=express.Router();

routes.post("/",CheckAuth,NewTasks)
routes.route("/:id")
      .get(CheckAuth,GetTasks)
      .put(CheckAuth,UpdateTask)
      .delete(CheckAuth,DeleteTask)

routes.post("/state/:id",CheckAuth,UpdateStatus)

export default routes;