import {
  fetchRecipes,
  fetchRecipeDetails,
  fetchFilters,
} from "../services/recipeService.js";
import { extractIngredients } from "../utils/extractIngredients.js";

export const getRecipes = async (req, res) => {
  try {
    const type = req.query.type || "";
    const value = req.query.value || "";
    const recipes = await fetchRecipes(type, value);
    res.json({ recipes });
  } catch (error) {
    res.status(500).json({ error: "Error while getting recipes" });
  }
};

export const getAllFilters = async (req, res) => {
  try {
    const filters = await fetchFilters();
    res.json(filters);
  } catch (error) {
    res.status(500).json({ error: "Error while getting filters" });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const recipe = await fetchRecipeDetails(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const ingredients = extractIngredients(recipe);

    const {
      idMeal,
      strMeal,
      strMealAlternate,
      strCategory,
      strArea,
      strInstructions,
      strMealThumb,
      strTags,
      strYoutube,
    } = recipe;

    res.json({
      idMeal,
      strMeal,
      strMealAlternate,
      strCategory,
      strArea,
      strInstructions,
      strMealThumb,
      strTags,
      strYoutube,
      ingredients,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error while getting a recipe",
    });
  }
};
