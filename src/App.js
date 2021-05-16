import React, { useState, useEffect } from "react";
import RecipeList from "./components/RecipeList";
import { v4 as uuidv4 } from "uuid";
import "./css/app.css";
export const RecipeProvider = React.createContext();
const LOCAL_STORAGE_KEY = "Cookinglist.recipes";

function App() {
  const [recipes, setRecipes] = useState(sampleRecipes);

  useEffect(() => {
    const recipesJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    recipesJSON != null && setRecipes(JSON.parse(recipesJSON));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const handleNewRecipe = () => {
    const newRecipe = {
      id: uuidv4(),
      name: "New",
      servings: 111,
      cookTime: "1:11",
      instructions: "1. first step.\n 2. second step \n 3. third step\n",
      ingredients: [
        {
          id: uuidv4(),
          name: "New Food",
          amount: "exampled amount 111",
        },
      ],
    };

    setRecipes([...recipes, newRecipe]);
  };
  const handleDeleteRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };
  const recipeProvider = {
    handleNewRecipe,
    handleDeleteRecipe,
  };
  return (
    <>
      <RecipeProvider.Provider value={recipeProvider}>
        <RecipeList recipes={recipes} />
      </RecipeProvider.Provider>
    </>
  );
}
export default App;
const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    servings: 3,
    cookTime: "1:45",
    instructions:
      "1. Put salt on chicken.\n 2. Put chicken in oven \n 3. Eat chicken\n",
    ingredients: [
      {
        id: 1,
        name: "chiken",
        amount: "2 pounds",
      },
      {
        id: 2,
        name: "salt",
        amount: "1 Tbs",
      },
    ],
  },
  {
    id: 2,
    name: "Plain pork",
    servings: 5,
    cookTime: "0:45",
    instructions:
      "1. Put paprika on pork.\n 2. Put prok in oven \n 3. Eat pork \n",
    ingredients: [
      {
        id: 1,
        name: "pork ",
        amount: "3 pounds ",
      },
      {
        id: 2,
        name: "paprika ",
        amount: "2 Tbs",
      },
    ],
  },
];
