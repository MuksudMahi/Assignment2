let express = require("express");
let router = express.Router();

let courseController = require("../controllers/course.server.controllers");

let checkAuth = require("../config/auth");

router.post("/addcourse", checkAuth.requireAuth, courseController.addCourse);
router.get(
  "/find/:courseCode",
  checkAuth.requireAuth,
  courseController.findByCourseCode
);
router.get("/students", courseController.showEnrolledStudnets);
router.post("/addstudent", courseController.addStudentToCourse);

module.exports = router;
