const setting = require("../models/Setting");

module.exports.createSetting = async (req, res) => {
  try {
    const set = await setting.create({ ...req.body });
    res.status(200).send({
      status: 200,
      message: "Success",
      data: set,
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to insert data",
      error: error,
      status: 400,
    });
    console.log(error);
  }
};

module.exports.getAllSetting = async (req, res) => {
  try {
    set = await setting.findAll();
    res.status(200).json({
      status: 200,
      message: "successfully getAll ",
      data: set,
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to insert data",
      error: error,
      status: 400,
    });
  }
};

module.exports.getOneSetting = async (req, res) => {
  try {
    set = await setting.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      status: 200,
      message: "successfully getAll ",
      data: set,
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to insert data",
      error: error,
      status: 400,
    });
  }
};

module.exports.updateSetting = async (req, res) => {
  try {
    set = await setting.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (set) {
      set.key = req.body.key;
      set.value = req.body.value;
      set.position = req.body.position;
      set.is_active = is_active;
      set.role = req.body.role;
      await set.save();
      res.status(200).json("Updated successfully!");
    } else {
      res.status(404).json("Id not found!");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteSetting = async (req, res, next) => {
  try {
    const deleteSetting = await setting.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (deleteSetting) {
      await deleteSetting.destroy();
    }
    res.status(200).json({
      status: 200,
      message: "successfully deleted",
      data: deleteSetting,
    });
  } catch (err) {
    console.log(err);
  }
};
