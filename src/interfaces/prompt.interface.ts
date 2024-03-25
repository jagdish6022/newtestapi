export interface Prompt {
  category: string;
  promptId: string;
  createdAt: string;
  prompt: string;
  title: string;
}

export interface Message {
  role: string;
  content: string;
}

interface Title {
  title: string;
  promptId: string;
}

export interface CategoryPromptItem {
  category: string;
  titles: Title[];
}
