import { Router } from "express";
import { issueController } from "./issue.controller";
import authorization from "../../middlewares/authorization";
import { USER_ROLE } from "../../types";

const router = Router();

// create issue
router.post(
    "/",
    authorization(USER_ROLE.contributor, USER_ROLE.maintainer),
    issueController.createIssue,
);

// get all issues
router.get("/", issueController.getAllIssues);

// get issue by id
router.get("/:id", issueController.getSingleIssue);

// update issue by id
router.patch(
    "/:id",
    authorization(USER_ROLE.contributor, USER_ROLE.maintainer),
    issueController.updateIssue,
);

// delete issue by id
router.delete(
    "/:id",
    authorization(USER_ROLE.maintainer),
    issueController.deleteIssue,
);

export const issueRoute = router;
