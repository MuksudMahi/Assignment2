let express = require("express");
let router = express.Router();

let courseController = require("../controllers/course.server.controllers");

let checkAuth = require("../config/auth");

router.post("/", courseController.addCourse);
router.get(
  "/:courseCode",
  checkAuth.requireAuth,
  courseController.findByCourseCode
);

module.exports = router;
