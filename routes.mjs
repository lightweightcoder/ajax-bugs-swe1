import db from './models/index.mjs';
import bugs from './controllers/bugs.mjs';

// import your controllers here

export default function routes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks
  const bugsController = bugs(db);
  app.get('/', bugsController.index);
  app.post('/createBug', bugsController.create);
}
