let express = require("express");
let router = express.Router();

let studentController = require("../controllers/student.server.controllers");

let checkAuth = require("../config/auth");

router.post("/register", studentController.register);
router.get("/", studentController.getStudent);
router.post("/login", studentController.processLogin);
router.get("/logout", studentController.processLogout);
router.get("/list", checkAuth.requireAuth, studentController.getStudentList);
router.get(
  "/courses",
  checkAuth.requireAuth,
  studentController.getStudentCourses
);
router.post("/addcourse", checkAuth.requireAuth, studentController.addCourse);
router.post("/dropcourse", checkAuth.requireAuth, studentController.dropCourse);
router.post(
  "/updatecourse",
  checkAuth.requireAuth,
  studentController.updateCourse
);

module.exports = router;
