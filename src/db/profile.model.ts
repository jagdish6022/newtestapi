import { Entity, TableManager, attribute } from 'dynamode';

export type ProfilesProps = {
  email: string;
};

export class Profiles extends Entity {
  @attribute.partitionKey.string()
  email: string;

  constructor(props: ProfilesProps) {
    super();
    Object.assign(this, props);
  }
}

const PROFILES_TABLE = 'profiles';

export const ProfilesTableManager = new TableManager(Profiles, {
  tableName: PROFILES_TABLE,
  partitionKey: 'email',
});

export const ProfilesManager = ProfilesTableManager.entityManager();
