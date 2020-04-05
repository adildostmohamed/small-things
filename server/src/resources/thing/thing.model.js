const mongoose = require("mongoose");

const thingSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Thing must have owner"],
    },
    content: {
      type: String,
      required: [true, "Thing must have content"],
    },
    date: {
      type: String,
      required: [true, "Thing must have a date"],
    },
    recurring: {
      type: String,
      enum: [
        "NONE",
        "DAILY",
        "WEEKDAY",
        "WEEKEND",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ],
      default: "NONE",
    },
    category: {
      type: String,
      enum: ["WORK", "PERSONAL", "OTHER", "UNKNOWN"],
      default: "UNKNOWN",
    },
    status: {
      type: String,
      enum: ["CREATED", "COMPLETED", "NOTCOMPLETED"],
      default: "CREATED",
    },
  },
  {
    timestamps: true,
  }
);

const Thing = mongoose.model("thing", thingSchema);

module.exports = Thing;
