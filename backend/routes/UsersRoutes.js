import express from "express";

import { CreateUser, User,LoginUser, confirmUser, ForgetPassword, ComprobateToken, ChangePassword, Profile } from "../controllers/UserController.js";
import CheckAuth from "../middleware/CheckAuth.js";

const routes=express.Router();

//routes.get("/",User)
//routes.get("/create",CreateUser)
//create register and delete user

routes.post("/",CreateUser);
routes.post("/login",LoginUser);
routes.get("/confirm/:token",confirmUser);
routes.post("/forgetPassword",ForgetPassword);
//routes.get("/forgetPassword/:token",ComprobateToken);
//routes.post("/forgetPassword/:token",ComprobateToken);
routes.route("/forgetPassword/:token")
        .get(ComprobateToken)
        .post(ChangePassword)

routes.get("/profile",CheckAuth,Profile)


export default routes;