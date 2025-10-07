export default function throttle({ waitTime }) {
  let throttleData = {};

  return (req, res, next) => {
    const ip = req.ip;
    console.log(req.headers.origin);
    let now = Date.now();

    const { prevDelay, lastRequestTime } = throttleData[ip] || {
      prevDelay: 0,
      lastRequestTime: now - waitTime,
    };

    const timePassed = now - lastRequestTime;
    const delay = Math.max(0, waitTime + prevDelay - timePassed);

    throttleData[ip] = {
      lastRequestTime: now,
      prevDelay: delay,
    };

    console.log(throttleData);

    setTimeout(() => {
      next();
    }, delay);
  };
}
