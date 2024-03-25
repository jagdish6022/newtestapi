import { ChatOpenAI } from '@langchain/openai';
import { ChatHistory, chatHistoryManager, chatHistoryTableManager } from '@/db/chat.model';

import { BaseMessageChunk, HumanMessage, MessageContent, SystemMessage } from '@langchain/core/messages';
import { Prompt } from '@/interfaces/prompt.interface';
import PromptService from './prompt.service';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatMessages, ChatResponse } from '@/interfaces/chat.interface';
import { Query } from 'dynamode';

const chatModel = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: process.env.OPENAI_MODEL,
  verbose: true,
});

class ChatService {
  public promptService = new PromptService();

  /**
   * Asynchronously generates a chat response for a given prompt and message.
   *
   * @param {Prompt} prompt - A Prompt object containing details such as the ID, title, and actual prompt content.
   * @param {string} [message] - An optional string representing the message from the user. Defaults to the prompt's title if not provided.
   * @param {string[]} [history] - An array of strings representing the conversation history.
   * @returns {Promise<ChatResponse[]>} A promise that resolves with an array of ChatResponse objects,
   *                                      which include both the user's message and the generated assistant's response.
   */
  public generateResponse = async (prompt: Prompt, history: ChatMessages[], message?: string): Promise<ChatResponse> => {
    // Convert the current prompt into a langchain template using the promptService.
    const promptTemplate: ChatPromptTemplate = this.promptService.convertToLangchainTemplates(prompt.prompt);

    // Format the messages by either using the provided message or the prompt's title as the question.
    const promptMessages = await promptTemplate.formatMessages({
      question: message || prompt.title,
      history: history.map((d: ChatMessages) => `${d.role}: ${d.content}`).join('\n'),
    });

    // Invoke the chat model which is expected to return a structured response to the formatted messages.
    const response: BaseMessageChunk = await chatModel.invoke(promptMessages);

    // Build a list that represents a single round of dialogue between the user and the assistant:
    // The user's message (or prompt's title), followed by the assistant's generated response.
    const messages: ChatResponse = {
      messages: [
        { content: message || prompt.title, role: 'user' },
        { content: response.content.toString(), role: 'assistant' },
      ],
    };

    // Return the constructed array of ChatResponse objects.
    return messages;
  };

  public getChatHistory = async (userId: string): Promise<ChatMessages[]> => {
    const history: ChatHistory[] = (
      await chatHistoryManager.query().partitionKey('userId').eq(userId).attributes(['content', 'role']).run({ max: 15 })
    ).items;
    const chatHistory: ChatMessages[] = history.map(({ role, content }: ChatMessages) => ({ role, content }));
    return chatHistory;
  };

  public addChatHistory = async (userId: string, content: string, email: string, role: string): Promise<ChatHistory> => {
    const history: ChatHistory = new ChatHistory({
      userId,
      index: new Date().getTime(),
      content,
      email,
      references: [],
      role,
      createdAt: Date.now().toString(),
    });
    const createHistory: ChatHistory = await chatHistoryManager.create(history);
    return createHistory;
  };
}

export default ChatService;
