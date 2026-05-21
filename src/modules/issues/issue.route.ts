import { Router } from "express";
import { issueController } from "./issue.controller";

const router = Router();

// create issue
router.post("/", issueController.createIssue);

// get all issues
router.get("/", issueController.getAllIssues);

router.get("/:id", issueController.getSingleIssue);

export const issueRoute = router;
