import db from './models/index.mjs';

// import your controllers here
import bugs from './controllers/bugs.mjs';
import features from './controllers/features.mjs';

export default function routes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks
  const bugsController = bugs(db);
  const featuresController = features(db);

  // routes
  app.get('/', bugsController.index);
  app.post('/createBug', bugsController.create);
  app.get('/features', featuresController.index);
}
