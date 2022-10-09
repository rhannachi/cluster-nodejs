import express, {Router} from "express";
import {fibonacciController} from "@/controllers";

const router: Router = express.Router()

router.get('/fibonacci', fibonacciController)

export default router