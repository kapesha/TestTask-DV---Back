"use strict";
import express from "express";
import cors from "cors";
import recipeRoutes from "./routes/recipeRoute.js";

export function createServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/api/recipes", recipeRoutes);

  return app;
}
