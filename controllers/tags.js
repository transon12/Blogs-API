// const Tag = require("../models/Like");
// const { appendTagList } = require("../util/helpers");

// module.exports.getTags = async (req, res, next) => {
//   let tags = await Tag.findAll({
//     attributes: ["name"],
//   });

//   tags = tags.map((tag) => tag.name);

//   res.status(200).json({ tags });
// };
