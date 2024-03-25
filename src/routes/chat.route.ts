import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import ChatController from '@/controllers/chat.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateChatDto } from '@/dtos/chat.dto';

class ChatRoute implements Routes {
  public path = '/chat';
  public router = Router();
  public chatController = new ChatController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validationMiddleware(CreateChatDto, 'body'), this.chatController.chat);
    this.router.get(`${this.path}/history`, this.chatController.getChatHistory);
  }
}

export default ChatRoute;
