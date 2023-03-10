let catyegories = require("../models/Category");

module.exports.createcatyegories = async (req, res, next) => {
  try {
    const article = await catyegories.create({ ...req.body });
    res.status(200).json({
      status: 200,
      message: "successfully created",
    });
    console.log(article);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};
