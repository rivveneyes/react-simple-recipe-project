import React, { useState, useEffect } from "react";
import RecipeList from "./components/RecipeList";
import { v4 as uuidv4 } from "uuid";
import "./css/app.css";
import RecipeEdit from "./components/RecipeEdit";

export const RecipeProvider = React.createContext();
const LOCAL_STORAGE_KEY = "Cookinglist.recipes";

function App() {
  const [recipes, setRecipes] = useState(sampleRecipes);
  const [selectedRecipeId, setSelectedRecipeId] = useState();

  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  );
  useEffect(() => {
    const recipesJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    recipesJSON != null && setRecipes(JSON.parse(recipesJSON));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const handleRecipeSelect = (id) => {
    setSelectedRecipeId(id);
  };

  const handleNewRecipe = () => {
    const newRecipe = {
      id: uuidv4(),
      name: "",
      servings: 1,
      cooktime: "",
      instructions: "",
      ingredients: [
        {
          id: uuidv4(),
          name: "",
          amount: "",
        },
      ],
    };
    handleRecipeSelect(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  };
  const handleDeleteRecipe = (id) => {
    if (selectedRecipe != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
    }
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };
  const handleRecipeChange = (id, recipe) => {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex((r) => r.id === id);
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
  };

  const recipeProvider = {
    handleNewRecipe,
    handleDeleteRecipe,
    handleRecipeSelect,
    handleRecipeChange,
  };
  return (
    <>
      <RecipeProvider.Provider value={recipeProvider}>
        <h1 className="heading">Recipes App</h1>
        <div className="flex-container">
          <RecipeList recipes={recipes} />
          {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
        </div>
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
    cooktime: "1:45",
    instructions:
      "1.Put salt on chicken.\n2.Put chicken in oven \n3.Eat chicken \n",
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
    cooktime: "0:45",
    instructions: "1.Put paprika on pork.\n2.Put pork in oven \n3.Eat pork \n",
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
