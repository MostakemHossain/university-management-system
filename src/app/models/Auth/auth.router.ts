import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import { AuthControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validate";

const router= express.Router();

router.post("/login",
validateRequest(AuthValidation.loginValidationSchema),
AuthControllers.loginUser
)

export const AuthRoutes= router;