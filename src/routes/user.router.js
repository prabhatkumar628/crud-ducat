import { Router } from "express";
import {
    add,
    addEdit,
    deleteRecord,
    edit,
    home,
    search,
    storeRecord
} from "../controllers/user.controller.js";

const router = Router()
router.route("").get(home)
router.route("/add").get(add)
router.route("/add").post(storeRecord)
router.route("/delete/:_id").get(deleteRecord)
router.route("/edit/:_id").get(edit)
router.route("/edit/:_id").post(addEdit)
router.route("/search").get(search)


export default router