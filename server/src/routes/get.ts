import type { Request, Response } from "express";

export const indexHandler = (_: Request, res: Response) => {
  res.send("Hello World");
};
