export interface ChatMessages {
  content: string;
  role: string;
}

export interface ChatResponse {
  messages: ChatMessages[];
}
