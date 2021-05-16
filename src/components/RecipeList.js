import React from "react";
import Recipe from "./Recipe";
export default function RecipeList(props) {
  const { recipes, handleNewRecipe, handleDeleteRecipe } = props;

  return (
    <div className="recipe-list">
      <div>
        {recipes.map((recipe) => {
          return (
            <Recipe
              handleDeleteRecipe={handleDeleteRecipe}
              key={recipe.id}
              {...recipe}
            />
          );
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
