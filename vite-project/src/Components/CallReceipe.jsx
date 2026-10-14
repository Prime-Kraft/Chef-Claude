export default function CallReceipe({ toggleRecipeShown }) {
  return (
    <div className="call-recipe-container">
      <div className="call-recipe-text">
        <h3> Ready for a recipe? </h3>
        <p> Generate a recipe from your list of ingredients.</p>
      </div>
      <button onClick={toggleRecipeShown}  className="call-recipe-btn"> Get a receipe </button>
    </div>
  )
}
