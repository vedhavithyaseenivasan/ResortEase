const mongoose = require("mongoose")

const ActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  targetUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    required: true,
    enum: [
      "booking",
      "cancellation",
      "update",
      "user_deletion",
      "password_reset",
      "account_lock",
      "account_unlock",
      "login",
      "logout",
    ],
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Activity", ActivitySchema)

