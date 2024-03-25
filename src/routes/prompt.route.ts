import { Router } from 'express';
import PromptController from '../controllers/prompt.controller';

class PromptRoute {
  public path = '/prompt';
  public router = Router();
  public promptController = new PromptController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.promptController.getAllPrompts);
  }
}

export default PromptRoute;
