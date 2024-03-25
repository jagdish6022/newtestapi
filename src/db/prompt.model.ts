import { Entity, TableManager, attribute } from 'dynamode';

export type PromptProps = {
  category: string;
  promptId: string;
  createdAt: string;
  prompt: string;
  title: string;
};

export class Prompt extends Entity {
  @attribute.partitionKey.string()
  promptId: string;

  @attribute.string()
  category: string;

  @attribute.string()
  createdAt: string;

  @attribute.string()
  prompt: string;

  @attribute.string()
  title: string;

  constructor(props: PromptProps) {
    super();
    Object.assign(this, props);
  }
}

const PROMPT_TABLE = 'prompt';

export const PromptTableManager = new TableManager(Prompt, {
  tableName: PROMPT_TABLE,
  partitionKey: 'promptId',
});

export const PromptManager = PromptTableManager.entityManager();
