// ---------------------------------------------------------------------------------------------
// YOU CAN MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// YOU SHOULD NOT CHANGE THE EXPORTED VALUE OF THIS FILE
// ---------------------------------------------------------------------------------------------

import bodyParser from 'body-parser';
import { json } from 'sequelize';
import authenticateToken from '../../middleware/auth';
const jsonParser = bodyParser.json();


export default (app) => {
  app.put(
    `/player/:id`, jsonParser, require('./update').default
  );
  app.delete(
    `/player/:id`,authenticateToken, require('./delete').default
  );
  app.get(
    `/player`, require('./getList').default
  );
  app.post(
    `/player`, jsonParser, require('./create').default
  );
};