import { Router } from "express";
import { issueController } from "./issue.controller";
import authorization from "../../middlewares/authorization";

const router = Router();

// create issue
router.post(
    "/",
    authorization("contributor", "maintainer"),
    issueController.createIssue,
);

// get all issues
router.get("/", issueController.getAllIssues);

// get issue by id
router.get("/:id", issueController.getSingleIssue);

// update issue by id
router.patch(
    "/:id",
    authorization("maintainer", "contributor"),
    issueController.updateIssue,
);

// delete issue by id
router.delete("/:id", authorization("maintainer"), issueController.deleteIssue);

export const issueRoute = router;
