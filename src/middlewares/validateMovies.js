const validateMovie = (req, res, next) => {
  const objectToVerify = req.body;
  const errors = [];
  const typeErrors = [];

  // if (objectToVerify.title == null) {
  //   errors.push({
  //     field: "title",
  //     message: "The field 'title' is required",
  //   });
  // } else if (objectToVerify.title.length >= 255) {
  //   typeErrors.push({
  //     field: "title",
  //     message: "The field 'title' shouldnt have more than 255 character",
  //   });
  // }
  // if (objectToVerify.director == null) {
  //   errors.push({
  //     field: "director",
  //     message: "The field 'director' is required",
  //   });
  // } else if (objectToVerify.director.length >= 255) {
  //   typeErrors.push({
  //     field: "director",
  //     message: "The field 'director' shouldnt have more than 255 character",
  //   });
  // }
  // if (objectToVerify.year == null) {
  //   errors.push({
  //     field: "year",
  //     message: "The field 'year' is required",
  //   });
  // } else if (objectToVerify.year.length >= 255) {
  //   typeErrors.push({
  //     field: "year",
  //     message: "The field 'year' shouldnt have more than 255 character",
  //   });
  // }
  // if (objectToVerify.color == null) {
  //   errors.push({
  //     field: "color",
  //     message: "The field 'color' is required",
  //   });
  // } else if (objectToVerify.color.length >= 255) {
  //   typeErrors.push({
  //     field: "color",
  //     message: "The field 'color' shouldnt have more than 255 character",
  //   });
  // }
  // if (objectToVerify.duration == null) {
  //   errors.push({
  //     field: "duration",
  //     message: "The field 'duration' is required",
  //   });
  // } else if (typeof objectToVerify.duration !== "number") {
  //   typeErrors.push({
  //     field: "duration",
  //     message: "The field 'duration' should be a number",
  //   });
  // }

  const fields = [
    { field: "title", type: "string", maxLength: 255 },
    { field: "director", type: "string", maxLength: 255 },
    { field: "year", type: "string", maxLength: 255 },
    { field: "color", type: "string", maxLength: 255 },
    { field: "duration", type: "number" },
  ];

  fields.forEach(({ field, type, maxLength }) => {
    if (objectToVerify[field] == null) {
      errors.push({
        field,
        message: `The field '${field}' is required`,
      });
    } else if (type === "string" && objectToVerify[field].length > maxLength) {
      typeErrors.push({
        field,
        message: `The field '${field}' shouldn't have more than ${maxLength} characters`,
      });
    } else if (type === "number" && typeof objectToVerify[field] !== "number") {
      typeErrors.push({
        field,
        message: `The field '${field}' should be a number`,
      });
    }
  });

  if (errors.length || typeErrors.length) {
    res
      .status(422)
      .json({ validationErrors: errors, fieldTypeError: typeErrors });
  } else {
    next();
  }
};

module.exports = validateMovie;
