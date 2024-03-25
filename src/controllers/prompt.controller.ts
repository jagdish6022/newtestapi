import { Request, Response } from 'express';
import PromptService from '@/services/prompt.service';
import { CategoryPromptItem, Prompt } from '@/interfaces/prompt.interface';
import { NextFunction } from 'connect';

class PromptController {
  public promptService = new PromptService();

  public getAllPrompts = (req: Request, res: Response, next: NextFunction) => {
    try {
      const prompts: CategoryPromptItem[] = this.promptService.getAllPrompts();
      res.status(200).json(prompts);
    } catch (error) {
      next(error);
    }
  };
}

export default PromptController;
