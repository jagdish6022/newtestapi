import { Entity, TableManager, attribute } from 'dynamode';

export type PromptSelectionLogProps = {
  userId: string;
  createdAt: string;
  category: string;
  promptId: string;
};

export class PromptSelectionLog extends Entity {
  @attribute.partitionKey.string()
  userId: string;

  @attribute.string()
  createdAt: string;

  @attribute.string()
  category: string;

  @attribute.string()
  promptId: string;

  constructor(props: PromptSelectionLogProps) {
    super();
    Object.assign(this, props);
  }
}

const PROMPTSELECTIONLOG_TABLE = 'PromptSelectionLog';

export const PromptSelectionLogTableManager = new TableManager(PromptSelectionLog, {
  tableName: PROMPTSELECTIONLOG_TABLE,
  partitionKey: 'userId',
});

export const PromptSelectionLogManager = PromptSelectionLogTableManager.entityManager();
