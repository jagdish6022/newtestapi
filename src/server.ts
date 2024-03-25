process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import PromptRoute from '@routes/prompt.route';
import ChatRoute from '@routes/chat.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new ChatRoute(), new PromptRoute()]);

app.listen();
