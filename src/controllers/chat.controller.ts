import { NextFunction, Request, Response } from 'express';
import { CreateChatDto } from '@/dtos/chat.dto';
import ChatService from '@/services/chat.service';
import PromptService from '@/services/prompt.service';
import { Prompt } from '@/interfaces/prompt.interface';
import { ChatMessages, ChatResponse } from '@/interfaces/chat.interface';

const TEMP_USER_ID = 'arun';
const TEMP_EMAIL = 'arun';

class ChatController {
  public chatService = new ChatService();
  public promptService = new PromptService();

  /**
   * Chat handler to process incoming chat requests and return generated responses.
   * This function is an Express middleware with an async signature.
   *
   * @param {Request} req - The Express request object containing the incoming request.
   * @param {Response} res - The Express response object for sending back the HTTP response.
   * @param {NextFunction} next - The Express next middleware function to pass control to the next middleware.
   * @returns {Promise<void>} An empty promise that resolves when the processing is done without returning any value.
   */
  public chat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Extract promptId and query from request body after validating against CreateChatDto.
      const { promptId, query }: CreateChatDto = req.body;

      // Retrieve the chat history of the user
      const history: ChatMessages[] = await this.chatService.getChatHistory(TEMP_USER_ID);
      // Retrieve the Prompt using the provided promptId by invoking a service method.
      const prompt: Prompt = this.promptService.findPromptById(promptId);

      // Use the chatService to asynchronously generate a chat response based on the prompt and query.
      const chatResponse: ChatResponse = await this.chatService.generateResponse(prompt, history, query);

      for (let index: number = 0; index < chatResponse.messages.length; index++) {
        const { content, role }: { content: string; role: string } = chatResponse.messages[index];
        // Adding chat messaged to chat history. The TEMP_USER_ID and TEMP_EMAIL need to be replaced with actual values after authentication setup.
        await this.chatService.addChatHistory(TEMP_USER_ID, content, TEMP_EMAIL, role);
      }

      // Add new message to the history

      // Send a successful HTTP status code (200) along with the generated chat response in JSON format.
      res.status(200).json({
        data: chatResponse,
        message: 'response generated !',
      });
    } catch (error) {
      // Log the error to the console and forward it to the next error-handling middleware.
      console.log(error);
      next(error);
    }
  };

  public getChatHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const chatHistory: ChatMessages[] = await this.chatService.getChatHistory(TEMP_USER_ID);
      const chatResponse: ChatResponse = { messages: chatHistory };
      res.status(200).json({
        data: chatResponse,
        message: 'chat history retrieved !',
      });
    } catch (error) {
      next(error);
    }
  };
}
export default ChatController;
