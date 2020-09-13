import express, { Request, Response } from "express";
import { ModuleResolutionKind } from "typescript";
const router = express.Router();

router.get(
  "/",
  (req: Request, res: Response): Response => res.send("HomePage")
);

module.exports = router;
