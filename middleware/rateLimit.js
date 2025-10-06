let rateLimitIps = {};

export const rateLimiter = ({ windowSize, maxRequest }) => {
  return (req, res, next) => {
    const ip = req.ip;
    const currentTime = Date.now();

    if (!rateLimitIps[ip]) {
      rateLimitIps[ip] = { totalRequest: 1, iat: currentTime };
      return next();
    }

    const timeDiff = currentTime - rateLimitIps[ip].iat;

    if (timeDiff > windowSize) {
      rateLimitIps[ip] = { totalRequest: 1, iat: currentTime };
    } else {
      rateLimitIps[ip].totalRequest++;
      if (rateLimitIps[ip].totalRequest > maxRequest) {
        return res.status(429).json({ error: 'Too many request,please wait' });
      }
    }
    next();
  };
};
