export default function IngredientList({ingredientListElement}) {
  return (
    <section className="ingredient-list">
      <h2> Ingredients on hand: </h2>
      <ul> {ingredientListElement}  </ul>
    </section>
  )
}
