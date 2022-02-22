let express = require("express");
let mongoose = require("mongoose");
let Student = mongoose.model("Student");

//Register new user
module.exports.register = (req, res, next) => {
  let newStudent = new Student(req.body);

  newStudent
    .save()
    .then(() => res.json(newStudent))
    .catch((err) => res.status(400).json("Error " + getErrorMessage(err)));
};

//Get a user
module.exports.login = (req, res, next) => {};

//Get student's courses
module.exports.getStudentCourses = (req, res, next) => {};

//Get student list
module.exports.getStudentList = (req, res, next) => {};

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
        message = "Student already exists";
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

  // Return the message error
  return message;
};
