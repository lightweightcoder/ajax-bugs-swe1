import { getHash } from '../lib/non-db-helper-functions.mjs';

export default function users(db) {
  const login = async (req, res) => {
    try {
      const emailInput = req.query.email;
      const passwordInput = req.query.password;
      const hashedPasswordInput = getHash(passwordInput);

      // try to find a user
      const user = await db.User.findOne(
        {
          where: { email: emailInput, password: hashedPasswordInput },
          include: {
            model: db.Bug,
          },
        },
      );

      // check if a user is found
      if (user === null) {
        console.log('user not found');
        res.send('no user');
      } else {
        res.send(user.dataValues);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { login };
}
