import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

export const fetchRecipes = async (type = "", value = "") => {
  let endpoint = "";

  switch (type) {
    case "":
      endpoint = `search.php?s=`;
      break;
    case "ingredient":
      endpoint = `filter.php?i=${value}`;
      break;
    case "country":
      endpoint = `filter.php?a=${value}`;
      break;
    case "category":
      endpoint = `filter.php?c=${value}`;
      break;
    default:
      throw new Error("Неверный тип фильтра");
  }

  const res = await axios.get(`${BASE_URL}${endpoint}`);
  return res.data.meals;
};

export const fetchFilters = async () => {
  const categoriesRes = await axios.get(`${BASE_URL}list.php?c=list`);
  const countryRes = await axios.get(`${BASE_URL}list.php?a=list`);
  const ingredientsRes = await axios.get(`${BASE_URL}list.php?i=list`);

  return {
    categories: categoriesRes.data.meals,
    countries: countryRes.data.meals,
    ingredients: ingredientsRes.data.meals
  };
};

export const fetchRecipeDetails = async (id) => {
  const res = await axios.get(
    `${BASE_URL}lookup.php?i=${id}`
  );
  return res.data.meals[0]
};
