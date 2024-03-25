import { Entity, TableManager, attribute } from 'dynamode';

export type chatHistoryProps = {
  userId: string;
  index: number;
  content: string;
  createdAt: string;
  email: string;
  references: string[];
  role: string;
};

export class ChatHistory extends Entity {
  @attribute.partitionKey.string()
  userId: string;

  @attribute.sortKey.number()
  index: number;

  @attribute.string()
  content: string;

  @attribute.date.number()
  createdAt: Date;

  @attribute.string()
  email: string;

  @attribute.array()
  references: string[];

  @attribute.string()
  role: string;

  constructor(props: chatHistoryProps) {
    super();
    Object.assign(this, props);
  }
}

const CHATHISTORY_TABLE = 'chatHistory';

export const chatHistoryTableManager = new TableManager(ChatHistory, {
  tableName: CHATHISTORY_TABLE,
  partitionKey: 'userId',
  sortKey: 'index',
  createdAt: 'createdAt',
});

export const chatHistoryManager = chatHistoryTableManager.entityManager();
