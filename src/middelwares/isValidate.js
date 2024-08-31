import { AppError } from "../utils/catchError.js";

export const validate = (schema, redirectPath) => {
  return (req, res, next) => {
    let data = { ...req.body, ...req.params, ...req.query };
    let { error } = schema.validate(data, { abortEarly: false });
    if (!error) {
      next();
    } else {
      let errMsg = error.details.map((err) => err.message);
      // next(new AppError(errMsg, 400));
      return res.redirect(`${redirectPath}?error=${encodeURIComponent(errMsg)}`);
    }
  };
};
