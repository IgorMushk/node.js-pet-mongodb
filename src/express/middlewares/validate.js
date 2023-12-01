const HttpError = require('../../modules/common/models/HttpError');

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(
      {
        query: req.query,
        body: req.body,
        params: req.params,
      },
      { abortEarly: false },
    );
    next();
  } catch (err) {
    const httpError = new HttpError(422, 'ValidationError', err.details);
    //const httpError = new HttpError(422, 'ValidationError', err.details[0].message);
    next(httpError);

  }
};


// const validate = (schema) => async (req, res, next) => {
//     try {
//         //const value = await schema.validateAsync(req);
//         const value = await schema.validateAsync(req.body);
//         //console.log(value);
//         next();
//     }
//     catch (err) { 
//         next(err);
//     }
// };


module.exports = validate;