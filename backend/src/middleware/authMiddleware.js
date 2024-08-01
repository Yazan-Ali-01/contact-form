export const authenticateAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.username === 'admin') {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized, Please login and try again" });
  }
};