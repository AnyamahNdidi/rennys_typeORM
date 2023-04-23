import express from "express";
const router = express.Router()

import { createUser, getOneUser, viewAllUser,userVerify ,loginUser,userTokenRefresh} from "../controller/userController"

router.route("/createuser").post(createUser)
router.route("/login").post(loginUser)
router.route("/refresh").post(userTokenRefresh)

router.route("/getall").get(viewAllUser)
router.route("/one/:id").get(getOneUser)

router.route("/:id").patch(userVerify)


export default router;