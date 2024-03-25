import { Entity, TableManager, attribute } from 'dynamode';

export type CognitoUserProps = {
  UserName: string;
  EmailAddress: string;
};

export class Cognito_USER extends Entity {
  @attribute.partitionKey.string()
  UserName: string;

  @attribute.string()
  EmailAddress: string;

  constructor(props: CognitoUserProps) {
    super();
    Object.assign(this, props);
  }
}

const USERS_TABLE = 'congnito_user';

export const UserTableManager = new TableManager(Cognito_USER, {
  tableName: USERS_TABLE,
  partitionKey: 'UserName',
});

export const UserManager = UserTableManager.entityManager();
