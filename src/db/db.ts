import { DynamoDB } from '@aws-sdk/client-dynamodb';
import Dynamode from 'dynamode/dynamode';

// Instantiate DynamoDB
const ddb: DynamoDB = new DynamoDB({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_DEFAULT_REGION,
});

// Pass DynamoDB instance to Dynamode
const initializeDyanamoDb = () => {
  Dynamode.ddb.set(ddb);
};

export default initializeDyanamoDb;
