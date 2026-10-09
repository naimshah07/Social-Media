import app from "../server.js";

// Vercel serverless handler — exports default is recognized by @vercel/node ESM mode
export default async (req, res) => {
  await app(req, res);
};
