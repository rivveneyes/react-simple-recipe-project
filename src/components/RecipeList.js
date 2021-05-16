import React, { useContext } from "react";
import Recipe from "./Recipe";
import { RecipeProvider } from "../App";

export default function RecipeList({ recipes }) {
  const { handleNewRecipe } = useContext(RecipeProvider);

  return (
    <div className="recipe-list">
      <div>
        {recipes.map((recipe) => {
          return <Recipe key={recipe.id} {...recipe} />;
        })}
      </div>
      <div className="recipe-list__btn-container">
        <button onClick={handleNewRecipe} className="btn btn--primary">
          Add Recipe
        </button>
      </div>
    </div>
  );
}
