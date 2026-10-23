import mongoose, { mongo } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "chat",
    },
    content: {
      type: String,
      required: true,
    },
    roles: {
      type: String,
      enum: ["user", "ai"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const messageModel = mongoose.model("message", messageSchema);

export default messageModel;
