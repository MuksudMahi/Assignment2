let express = require("express");
let router = express.Router();

let courseController = require("../controllers/course.server.controllers");

router.post("/", courseController.addCourse);
router.get("/:courseCode", courseController.findByCourseCode);

module.exports = router;
