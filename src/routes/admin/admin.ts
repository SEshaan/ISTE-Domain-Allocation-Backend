import {Router} from "express";
import {verifyFirebaseToken} from "../../middlewares/firebase.js";
import {login} from "./login.js";
import {getAllUsers, getUser} from "./user.js";
import {verifyAdmin} from "../../middlewares/admin.js";
import {getWhitelistedUsers, addWhitelistedUsers, removeWhitelistedUsers} from "./whitelisted.js";
import {getUserByDomain} from "./user.js";
import {getDomain, getAllDomains, addDomain, removeDomain, updateDomain} from "./domain.js";
import { addQuestionnare, updateQuestionnare, deleteQuestionnare, getQuestionnare } from "./question.js";
import { getAllInterviews, getInterviewById, updateInterview, cancelInterview, scheduleInterview } from "./interview.js";

export const AdminRouter: Router = Router();

AdminRouter.use(verifyFirebaseToken);
AdminRouter.post("/login", login);

AdminRouter.use(verifyAdmin);
AdminRouter.get("/user", getAllUsers);
AdminRouter.get("/user/:userId", getUser);
AdminRouter.get("/user/:domain", getUserByDomain);

AdminRouter.get("/whitelist", getWhitelistedUsers);
AdminRouter.post("/whitelist", addWhitelistedUsers);
AdminRouter.delete("/whitelist/:whitelistId", removeWhitelistedUsers);

AdminRouter.get("/domain", getAllDomains);
AdminRouter.get("/domain/:domainId", getDomain);
AdminRouter.post("/domain", addDomain);
AdminRouter.put("/domain/:domainId", updateDomain);
AdminRouter.delete("/domain/:domainId", removeDomain);

AdminRouter.get("/questionnare/:questionnareId", getQuestionnare);
AdminRouter.post("/questionnare/:domainId", addQuestionnare);
AdminRouter.put("/questionnare/:questionnareId", updateQuestionnare);
AdminRouter.delete("/questionnare/:questionnareId", deleteQuestionnare);

AdminRouter.get("/interview", getAllInterviews);
AdminRouter.get("/interview/:interviewId", getInterviewById);
AdminRouter.post("/interview", scheduleInterview);
AdminRouter.put("/interview/:interviewId", updateInterview);
AdminRouter.delete("/interview/:interviewId", cancelInterview);

//Tasks left
