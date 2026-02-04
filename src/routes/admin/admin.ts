import { Router } from "express";
import { verifyFirebaseToken } from "../../middlewares/firebase.js";
import {login} from "./login.js";

export const AdminRouter: Router = Router();

AdminRouter.post("/login", verifyFirebaseToken, login);