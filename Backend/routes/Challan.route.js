import { Router } from "express";
import { createChallan, DeleteChallan, getAllChallan, getChallanDetails, UpdateChallan } from "../controllers/challan.controller.js";

const router = Router();

router.post("/create-challan", createChallan);
router.get("/get-challan/:id", getChallanDetails);
router.get("/get-all-challan", getAllChallan);
router.delete("/delete-challan/:id", DeleteChallan);
router.patch("/update-challan/:id", UpdateChallan);

export default router;