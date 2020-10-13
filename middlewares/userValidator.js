const Joi = require("joi");
const { FailedResponse } = require("../helpers/user-api-response-helper");

exports.UserValidator = (request, response, next) => {
  const { name, email, age } = request.body;

  const schema = Joi.object().keys({
    name: Joi.string().required().messages({
      "string.empty": "Name is required!",
    }),

    email: Joi.string().trim().email().required().messages({
      "string.email": "Enter a valid email!",
      "string.empty": "Email is required!",
    }),

    age: Joi.number().integer().required().messages({
      "number.number": "Age must be a number!",
      "any.number": "Age must be an integer!",
      "number.empty": "Age is required!",
    }),
  });

  const { error } = schema.validate(
    { name, email, age },
    {
      abortEarly: false,
    }
  );

  if (error) {
    const errorsArray = [];
    error.details.map((err) => {
      errorsArray.push(err.message);
    });
    FailedResponse(response, 400, errorsArray);
  } else {
    next();
  }
};
