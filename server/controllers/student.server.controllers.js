let express = require("express");
let mongoose = require("mongoose");
let Student = mongoose.model("Student");
let passport = require("passport");

let Course = mongoose.model("Course");

//Register new user
module.exports.register = (req, res, next) => {
  // let newStudent = new Student(req.body);

  // Student.register(newStudent, req.body.password)
  //   .then(() => res.json(newStudent))
  //   .catch((err) => res.status(400).json("Error: " + err));
  passport.authenticate("local-signup", (err, user, info) => {
    //server error
    if (err) {
      res.status(400).json(err);
    }
    if (user == false) {
      return res.json(info);
    }
    //user login error
    req.login(user, (err) => {
      //server error
      if (err) {
        return res.status(400).json(err);
      }
      res.json("logged in");
    });
  })(req, res, next);
};

//Get a user
module.exports.processLogin = (req, res, next) => {
  //   Student.findOne({ studentNumber: req.body.username }).then((result) =>
  //     res.json(result)
  //   );
  passport.authenticate("local-login", (err, user, info) => {
    //server error
    if (err) {
      return next(err);
    } else if (!user) {
      return res.json(info);
    }
    //user login error
    else {
      req.login(user, (err) => {
        //server error
        if (err) {
          return next(err);
        }
        return res.json(info);
      });
    }
  })(req, res, next);
};

//Logout
module.exports.processLogout = (req, res, next) => {
  if (req.user) {
    req.logout();
    res.json("Logged out");
  }
};

//Get student's courses
module.exports.getStudentCourses = (req, res, next) => {
  Student.findOne({ _id: req.user._id })
    .select({ courses: 1 })
    .populate({ path: "courses._id", select: "courseName", model: "Course" })
    .then((result) => res.json(result));
};

//Get student list
module.exports.getStudentList = (req, res, next) => {
  Student.find()
    .select({ firstName: 1, lastName: 1 })
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json("Error: " + err));
};

//get logged in student
module.exports.getStudent = (req, res, next) => {
  return res.json(req.user);
};

//add a course
module.exports.addCourse = (req, res, next) => {
  let currentStudent = req.user;
  currentStudent.courses.push({
    _id: mongoose.Types.ObjectId(req.body.courseId),
    section: req.body.section,
  });
  Course.findByIdAndUpdate(
    mongoose.Types.ObjectId(req.body.courseId),
    { $push: { students: currentStudent._id } },
    { new: true, upsert: true },
    function (err, managerparent) {
      if (err) throw err;
      return;
    }
  );
  currentStudent
    .save()
    .then(res.json(currentStudent))
    .catch((err) => res.status(400).json(err));
};

//drop a course
module.exports.dropCourse = (req, res, next) => {
  let currentStudent = req.user;
  let courses = currentStudent.courses.filter((value, index, arr) => {
    return !value._id.equals(mongoose.Types.ObjectId(req.body.courseId));
  });
  currentStudent.courses = courses;
  currentStudent
    .save()
    .then(res.json(currentStudent))
    .catch((err) => res.status(400).json(err));
};

//update course
module.exports.updateCourse = (req, res, next) => {
  let currentStudent = req.user;
  let updatedCourse = {
    _id: mongoose.Types.ObjectId(req.body.courseId),
    section: req.body.section,
  };

  let courses = currentStudent.courses.filter((value, index, arr) => {
    return !value._id.equals(updatedCourse._id);
  });

  currentStudent.courses = courses;
  currentStudent.courses.push(updatedCourse);

  currentStudent
    .save()
    .then(res.json(currentStudent))
    .catch((err) => res.status(400).json(err));
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
