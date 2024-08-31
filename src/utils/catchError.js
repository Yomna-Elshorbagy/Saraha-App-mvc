export class AppError extends Error{
  constructor(message, statusCode){
    super(message);
    this.statusCode = statusCode;
  };
};

export function catchAsyncError(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(err => { 
      return next(new AppError(err.message, err.statusCode))
    });
  };
};

export const globalError = async (err , req, res ,next)=>{
  let code = err.statusCode || 500 
  res.status(code).json({ 
      error: "Error: ", 
      message: err.message , 
      code ,
      sucess: false, 
      stack: err.stack});
};
