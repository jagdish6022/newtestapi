import fs from 'fs';
import { CategoryPromptItem, Message, Prompt } from '../interfaces/prompt.interface';
import StoredPrompts from '../utils/prompts';
import {
  SystemMessagePromptTemplate,
  AIMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
  BaseMessagePromptTemplate,
} from '@langchain/core/prompts';

enum MessageRole {
  AI = 'AI',
  System = 'System',
  Human = 'Human',
}

class PromptService {
  private transformPromptItems = (items: Prompt[]): CategoryPromptItem[] => {
    const categoryMap: Record<string, { title: string; promptId: string }[]> = {};

    items.forEach(({ category, title, promptId }) => {
      // Initialize the array if this is the first time we're seeing the category or push to it if it already exists.
      (categoryMap[category] ||= []).push({ title, promptId });
    });

    // Transform the categoryMap into an array of objects containing category and titles.
    return Object.entries(categoryMap).map(([category, titles]) => ({
      category,
      titles,
    }));
  };

  public getAllPrompts(): CategoryPromptItem[] {
    return this.transformPromptItems(StoredPrompts);
  }

  public findPromptById(promptId: string): Prompt {
    const foundPrompt: Prompt | undefined = StoredPrompts.find(prompt => prompt.promptId === promptId);
    if (foundPrompt) {
      return foundPrompt;
    } else {
      // Find and return the DEFAULT prompt
      const defaultPrompt: Prompt = StoredPrompts.find(prompt => prompt.promptId === 'DEFAULT');
      if (!defaultPrompt) {
        throw new Error('Default prompt not found');
      }
      return defaultPrompt;
    }
  }

  private convertTextToMessages = (data: string): Message[] => {
    const messages: Message[] = [];
    const lines = data.split('\n');
    let currentSpeaker: string | null = null; // Initialize currentSpeaker with null to represent no speaker selected

    for (const line of lines) {
      if (line.startsWith('AI:')) {
        currentSpeaker = MessageRole.AI;
        messages.push({ role: currentSpeaker, content: line.slice(4) });
      } else if (line.startsWith('System:')) {
        currentSpeaker = MessageRole.System;
        messages.push({ role: currentSpeaker, content: line.slice(8) });
      } else if (line.startsWith('Human:')) {
        currentSpeaker = MessageRole.Human;
        messages.push({ role: currentSpeaker, content: line.slice(7) });
      } else {
        if (currentSpeaker) {
          messages[messages.length - 1].content += '\n' + line;
        }
      }
    }
    return messages;
  };

  public convertToLangchainTemplates = (prompt: string): ChatPromptTemplate => {
    // Adjust the return type according to the actual return type of ChatPromptTemplate.fromMessages()
    const langchainTemplates: any[] = []; // Adjust the type as necessary
    const messages: Message[] = this.convertTextToMessages(prompt);
    for (const message of messages) {
      let template: BaseMessagePromptTemplate; // Adjust the type based on the actual type returned by the fromTemplate methods

      if (message.role === MessageRole.AI) {
        template = AIMessagePromptTemplate.fromTemplate(message.content);
      } else if (message.role === MessageRole.System) {
        template = SystemMessagePromptTemplate.fromTemplate(message.content);
      } else if (message.role === MessageRole.Human) {
        template = HumanMessagePromptTemplate.fromTemplate(message.content);
      }

      if (template) {
        langchainTemplates.push(template);
      }
    }

    return ChatPromptTemplate.fromMessages(langchainTemplates);
  };
}

export default PromptService;
