// require jssha lib
const jsSha = require('jssha');

// function to generate a hash for password
function getHash(input) {
  // environment variable to use as a secret word for hashing userId cookie
  // environment variable is currently stored in ~/.profile (see RA module 3.6.4)
  const myEnvVar = process.env.MY_ENV_VAR;

  // create new SHA object
  // eslint-disable-next-line new-cap
  const shaObj = new jsSha('SHA-512', 'TEXT', { encoding: 'UTF8' });

  // create an unhashed cookie string based on user ID and myEnVar
  const unhashedString = `${input}-${myEnvVar}`;

  // generate a hashed cookie string using SHA object
  shaObj.update(unhashedString);

  return shaObj.getHash('HEX');
}

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    // import { getHash } from '../lib/non-db-helper-functions.mjs';

    const usersList = [
      {
        email: 'kai@kai.com',
        password: getHash('kai'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'alvin@alvin.com',
        password: getHash('alvin'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const [kai] = await queryInterface.bulkInsert(
      'Users',
      usersList,
      { returning: true },
    );

    const featuresList = [
      {
        name: 'Search Function',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Navbar',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Carousel',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chat',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const [feature1] = await queryInterface.bulkInsert(
      'Features',
      featuresList,
      { returning: true },
    );

    const bugsList = [
      {
        problem: 'Crashes on search GET request.',
        errorText: 'Cannot set property "fill" of null',
        commit: '961f1c',
        FeatureId: feature1.id,
        UserId: kai.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Bugs', bugsList);
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Features', null, {});
  },
};
