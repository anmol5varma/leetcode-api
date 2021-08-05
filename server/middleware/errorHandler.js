const errorHandler = (err, req, res, next) => {
  res.status(500).json('Something went wrong');
  next(err);
};

export default errorHandler;
