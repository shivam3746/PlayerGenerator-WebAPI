//Utilizing token provided in the challenge
const expectedToken = 'SkFabTZibXE1aE14ckpQUUxHc2dnQ2RzdlFRTTM2NFE2cGI4d3RQNjZmdEFITmdBQkE=';

const authenticateToken = (req, res, next) => {
  const providedToken = req.headers.authorization;

  if (!providedToken || providedToken !== `Bearer ${expectedToken}`) {
    return res.sendStatus(401); // Unauthorized
  }

  next();
};

export default authenticateToken;
