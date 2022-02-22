let mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    courseCode: {
      type: String,
      unique: true,
      trim: true,
      required: "Course code is required",
      uppercase: true,
    },
    courseName: {
      type: String,
      required: "Course name is required",
    },
    section: {
      type: [String],
      required: "Section is required",
    },
    semester: String,
  },
  {
    timestamps: true,
  }
);

mongoose.model("Course", courseSchema);
