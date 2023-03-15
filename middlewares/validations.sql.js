const validate = {};

validate.maxLength = (field, maxLength) => {
  if (field && field.length > maxLength) {
    return {
      message: `field must be no more than ${maxLength} characters.`,
    };
  }
};

validate.minLength = (field, minLength) => {
  console.log(field);
  console.log(field.length);
  if (!field || field.length === minLength) {
    return {
      message: `field must be no more than ${minLength} characters.`,
    };
  }
};
// validate.minLength = (field, minLength) => {
//   if (field && field.length < minLength) {
//     return {
//       message: `field must be at least ${minLength} characters.`,
//     };
//   }
// };

validate.fk = (Model, field) => {
  return async (req, res, next) => {
    const value = req.body[field];
    if (value) {
      try {
        const record = await Model.findByPk(value);
        if (!record) {
          return res.status(422).json({
            message: `${field} does not exist.`,
          });
        }
      } catch (err) {
        next(err);
      }
    }
    next();
  };
};

module.exports = validate;
