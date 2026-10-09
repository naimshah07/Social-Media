import app from "./server.js";

// Vercel serverless handler (ES module default export works with @vercel/node 3.x+)
export default async (req, res) => {
  await app(req, res);
};
