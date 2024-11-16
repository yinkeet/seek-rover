// @deno-types="npm:@types/express@5"
import express, { NextFunction, Request, Response } from "npm:express@5";
// @deno-types="npm:@types/node"
import process from "node:process";

const app = express();
const port = Number(Deno.env.get("PORT")) || 8080;

const reqLogger = function (req: Request, _res: Response, next: NextFunction) {
  console.info(`${req.method} request to "${req.url}" by ${req.hostname}`);
  next();
};

app.use(reqLogger);

app.get('/healthz', (_req: Request, res: Response) => {
  res.status(200).json({
    uptime: process.uptime()
  });
});

app.listen(port, () => {
  console.log(`Listening on ${port} ...`);
});