import { Router } from "express";
import { verifyFirebaseToken } from "../../middlewares/firebase.js";
import { loginOrSignup } from "./login.js";

export const UserRouter: Router = Router();

UserRouter.post("/login", verifyFirebaseToken, loginOrSignup);