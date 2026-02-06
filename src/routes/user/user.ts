import { Router } from "express";
import { verifyFirebaseToken } from "../../middlewares/firebase.js";
import { loginOrSignup } from "./login.js";
import { verifyUser } from "../../middlewares/user.js";
import { completeProfile, getProfile, updateProfile } from "./profile.js";
import {getAllDomains, getDomain, applyForDomain} from "./domain.js";
import { getQuestionnareByDomain, submitQuestionnare, updateQuestionnare } from "./question.js";
import { getInterviews } from "./interview.js";

export const UserRouter: Router = Router();

UserRouter.use(verifyFirebaseToken);
UserRouter.post("/login", loginOrSignup);

UserRouter.use(verifyUser);
UserRouter.get("/profile/get", getProfile);
UserRouter.post("/profile/complete", completeProfile);
UserRouter.put("/profile/update", updateProfile);

UserRouter.get("/domain", getAllDomains);
UserRouter.get("/domain/:domainId", getDomain);
UserRouter.post("/domain/apply", applyForDomain);

UserRouter.get("/questionnare/:domainId", getQuestionnareByDomain);
UserRouter.post("/questionnare/submit/:domainId", submitQuestionnare);
UserRouter.put("/questionnare/update/:domainId", updateQuestionnare);

UserRouter.get("/interview", getInterviews);