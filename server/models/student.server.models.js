let mongoose = require("mongoose");
let { Schema } = mongoose;

let studentSchema = new Schema(
  {
    studentNumber: {
      type: String,
      unique: true,
      match: [/[0-9]{9}/, "Student number should be 9 digits long number"],
      trim: true,
      required: "Student number is required",
    },
    firstName: {
      type: String,
      required: "First name is required",
    },
    lastName: {
      type: String,
      required: "Last name is required",
    },
    address: String,
    city: String,
    phoneNumber: String,
    program: {
      type: String,
      required: "Program name is required",
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, "Invalid email address"],
      required: "Email is required",
    },
    password: {
      type: String,
      required: "Password is required",
      validate: [
        (password) => password && password.length >= 6,
        "Password length should be at least 6",
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Configure the 'StudentSchema' to use getters and virtuals when transforming to JSON
studentSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});

mongoose.model("Student", studentSchema);
