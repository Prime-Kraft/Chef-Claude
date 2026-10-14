import React from 'react'
import IngredientList from './IngredientList.jsx'
import CallReceipe from './CallReceipe.jsx'
import { getReceipeFromDeepSeek } from "../api.js"

import ReactMarkdown from "react-markdown";

export default function Main() {

  const [ingredientList, setIngredientList]
    = React.useState([])

  function addIngredient(formData) {
    const addedIngredient = formData.get('ingredient')

    setIngredientList(prevIngredients => [...prevIngredients, addedIngredient])

  }





  const ingredientListElement = ingredientList.map(
    (ingredient, index) => {
     return  <li key={index}> {ingredient} </li>
  }
  )

  const [isRecipeShown, setIsReceipeShown] = React.useState(false)

 const[ receiptFromAi, setReceiptFromAi] = React.useState(null)

  async function handleAiRecipe() {
    console.log("👉 handleAiRecipe called");
    try {
      const receipe = await getReceipeFromDeepSeek(ingredientList);
  console.log(receipe)
    setReceiptFromAi(receipe)
    }

    catch (error) {
      console.error("Failed to fetch receipt:", error);
    }
  }





  function toggleRecipeShown() {
    setIsReceipeShown(prevState => !prevState)

      handleAiRecipe()

  }





  return (


    <>
    <main className="form-container">

      <form action={ addIngredient} className="add-ingredient">
        <input type="text" name="ingredient" aria-label="add ingredient" placeholder="e.g oregano"/>
        <button type="submit"> Add ingredient</button>
        </form>
        <IngredientList ingredientListElement={ingredientListElement} />
        {ingredientList.length > 3 ? <CallReceipe toggleRecipeShown={toggleRecipeShown} /> : null}
        {isRecipeShown && receiptFromAi && (
          <ReactMarkdown>{receiptFromAi}</ReactMarkdown>
        )}
    </main>

    </>
  )
}
