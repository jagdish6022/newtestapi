import { Entity, TableManager, attribute } from 'dynamode';

export type RoleProps = {
  email: string;
  type: string;
  role: string;
  team: string;
};

export class Role extends Entity {
  @attribute.partitionKey.string()
  email: string;

  @attribute.string()
  type: string;

  @attribute.string()
  role: string;

  @attribute.string()
  team: string;

  constructor(props: RoleProps) {
    super();
    Object.assign(this, props);
  }
}

const ROLE_TABLE = 'role';

export const RoleTableManager = new TableManager(Role, {
  tableName: ROLE_TABLE,
  partitionKey: 'email',
});

export const RoleManager = RoleTableManager.entityManager();
