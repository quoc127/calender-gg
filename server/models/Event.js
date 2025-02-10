const mongoose = require("mongoose");

const EventSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    type: {
      type: String,
      enum: ["appointment", "event"],
      default: "appointment",
    },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", EventSchema, "events");
module.exports = Event;
