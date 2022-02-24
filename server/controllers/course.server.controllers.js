let mongoose = require("mongoose");
let Course = mongoose.model("Course");
let bodyParser = require("body-parser");

//Add a new course
module.exports.addCourse = (req, res, next) => {
  let newCourse = new Course(req.body);

  newCourse
    .save()
    .then(() => res.json("Course added"))
    .catch((err) => res.status(400).json("Error: " + getErrorMessage(err)));
};

//Update a course
module.exports.updateCourse = (req, res, next) => {};

//Drop a course
module.exports.dropCourse = (req, res, next) => {};

//Show all students enrolled in a course
module.exports.showEnrolledStudnets = (req, res, next) => {};

//Show all courses
module.exports.showCourseList = (req, res, next) => {};

//find course by courseCode
module.exports.findByCourseCode = (req, res, next) => {
  Course.findOne({ courseCode: req.params.courseCode }).then((result) => {
    res.send(result ? result : "Not found");
  });
};

// Create a new error handling controller method
const getErrorMessage = function (err) {
  // Define the error message variable
  var message = "";

  // If an internal MongoDB error occurs get the error message
  if (err.code) {
    switch (err.code) {
      // If a unique index error occurs set the message error
      case 11000:
      case 11001:
        message = "Course already added";
        break;
      // If a general error occurs set the message error
      default:
        message = "Something went wrong";
    }
  } else {
    // Grab the first error message from a list of possible errors
    for (const errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }
};
