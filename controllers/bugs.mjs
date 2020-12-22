export default function bugs(db) {
  const index = async (req, res) => {
    res.render('home');
  };
  const create = async (req, res) => {
    const { problem, commit, errorText } = req.body;

    await db.Bug.create({
      problem,
      commit,
      errorText,
    });
    res.send('Bug Submitted');
  };

  return { index, create };
}
