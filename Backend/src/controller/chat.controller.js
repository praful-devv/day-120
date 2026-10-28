import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { generateChatTitle, generateResponse } from "../services/ai.service.js";

export const messageController = async (req, res, next) => {
  const { message, chatId } = req.body;

  let chat;

  if (chatId) {
    chat = await chatModel.findOne({
      _id: chatId,
      user: req.user.id,
    });

    if (!chat) {
      return res.status(404).json({
        message: "chat not found",
      });
    }
  } else {
    const title = await generateChatTitle(message);
    chat = await chatModel.create({
      user: req.user.id,
      title,
    });
  }

  const usermessage = await messageModel.create({
    chat: chat._id,
    content: message,
    roles: "user",
  });

  const messages = await messageModel.find({ chat: chat._id });

  const result = await generateResponse(messages);

  const aimessage = await messageModel.create({
    chat: chat._id,
    content: result,
    roles: "ai",
  });

  res.status(201).json({
    title: chat.title,
    chat,
    aimessage,
    messages,
  });
};

export const getChatsController = async (req, res, next) => {
  const user = req.user;

  const chats = await chatModel.find({ user: user.id });

  res.status(200).json({
    message: "chats get successfully",
    chats,
  });
};

export const getMessages = async (req, res, next) => {
  const { chatId } = req.params;

  const chat = await chatModel.findOne({
    _id: chatId,
    user: req.user.id,
  });

  if (!chat) {
    return res.status(404).json({
      message: "chat not found",
    });
  }

  const messages = await messageModel.find({
    chat: chatId,
  });

  res.status(200).json({
    message: "message retrived successfully",
    messages,
  });
};
