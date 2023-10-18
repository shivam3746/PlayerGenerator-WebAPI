// ---------------------------------------------------------------------------------------------
// YOU CAN MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// YOU SHOULD NOT CHANGE THE EXPORTED VALUE OF THIS FILE
// ---------------------------------------------------------------------------------------------

import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

export default (app) => {
  app.post(
    `/team/process`, jsonParser, require('./process').default
  );
};