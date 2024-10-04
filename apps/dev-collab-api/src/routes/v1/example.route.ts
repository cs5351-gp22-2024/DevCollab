import express from "express"
import exampleController from "../../controller/example.controller"
const router = express.Router();

router.get("/helloworld", exampleController.getHelloWorld);

export default router
