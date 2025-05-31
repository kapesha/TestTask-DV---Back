import express from "express";
import {
  getRecipes,
  getRecipeById,
  getAllFilters,
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/filters", getAllFilters);
router.get("/", getRecipes);
router.get("/:id", getRecipeById);

export default router;
