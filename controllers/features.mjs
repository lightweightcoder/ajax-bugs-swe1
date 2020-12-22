export default function features(db) {
  const index = async (req, res) => {
    // get a list of all features
    const featuresList = await db.Feature.findAll();

    res.send(featuresList);
  };

  return { index };
}
