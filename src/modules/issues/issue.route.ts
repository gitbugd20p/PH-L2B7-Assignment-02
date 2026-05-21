import { Router } from "express";
import { issueController } from "./issue.controller";
import authorization from "../../middlewares/authorization";

const router = Router();

// create issue
router.post("/", issueController.createIssue);

// get all issues
router.get("/", authorization("contributor"), issueController.getAllIssues);

// get issue by id
router.get("/:id", issueController.getSingleIssue);

// update issue by id
router.patch("/:id", issueController.updateIssue);

// delete issue by id
router.delete("/:id", issueController.deleteIssue);

export const issueRoute = router;
