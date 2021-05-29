import React, { useContext } from "react";
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { RecipeProvider } from "../App";
import { v4 as uuidv4 } from "uuid";

export default function RecipeEdit({ recipe }) {
  const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeProvider);

  function handleChange(changes) {
    handleRecipeChange(recipe.id, { ...recipe, ...changes });
  }
  function handleIngredientChange(id, ingredient) {
    const newIngredient = [...recipe.ingredients];
    const index = newIngredient.findIndex((i) => i.id === id);
    newIngredient[index] = ingredient;
    handleChange({ ingredients: newIngredient });
  }
  function handleIngredientAdd() {
    const newIngredient = {
      id: uuidv4(),
      name: "",
      amount: "",
    };
    handleChange({ ingredients: [...recipe.ingredients, newIngredient] });
  }
  function handleIngredientDelete(id) {
    handleChange({
      ingredients: recipe.ingredients.filter((i) => i.id !== id),
    });
  }

  return (
    <div className="recipe-edit">
      <div className="recipe-edit__remove-button-container">
        <button
          onClick={() => {
            handleRecipeSelect(undefined);
          }}
          className="btn recipe-edit__remove-button"
        >
          &times;
        </button>
      </div>

      <div className="recipe-edit__details-grid">
        <label htmlFor="name" className="recipe-edit__label">
          Name
        </label>
        <input
          className="recipe-edit__input"
          type="text"
          name="Name"
          id="name"
          value={recipe.name}
          onChange={(e) => handleChange({ name: e.target.value })}
        ></input>
        <label className="recipe-edit__label" htmlFor="cook time">
          Cook Time
        </label>
        <input
          className="recipe-edit__input"
          type="text"
          name="Cook Time"
          id="cook time "
          value={recipe.cooktime}
          onChange={(e) => handleChange({ cooktime: e.target.value })}
        ></input>
        <label className="recipe-edit__label" htmlFor="servings">
          Servings
        </label>
        <input
          className="recipe-edit__input"
          type="number"
          min="1"
          name="servings"
          id="servings"
          value={recipe.servings}
          onChange={(e) =>
            handleChange({ servings: parseInt(e.target.value) || "" })
          }
        ></input>
        <label className="recipe-edit__label" htmlFor="instructions">
          Instructions
        </label>
        <textarea
          className="recipe-edit__input"
          name="instructions"
          id="instructions"
          onChange={(e) => handleChange({ instructions: e.target.value })}
          value={recipe.instructions}
        >
          {recipe.instructions}
        </textarea>
      </div>
      <br />
      <label className="recipe-edit__label">Ingredients</label>
      <div className="recipe-edit__ingredient-grid">
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {recipe.ingredients.map((ingredient) => (
          <RecipeIngredientEdit
            key={ingredient.id}
            ingredient={ingredient}
            handleIngredientDelete={handleIngredientDelete}
            handleIngredientChange={handleIngredientChange}
          />
        ))}
      </div>
      <div className="recipe-edit__add-ingredient-btn-container">
        <button
          className="btn btn--primary"
          onClick={() => handleIngredientAdd()}
        >
          Add ingredient
        </button>
      </div>
    </div>
  );
}
