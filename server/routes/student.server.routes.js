let express = require("express");
let router = express.Router();

let studentController = require("../controllers/student.server.controllers");

router.post("/", studentController.register);

module.exports = router;
