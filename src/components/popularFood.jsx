import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function PopularFood() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [area, setArea] = useState("All");

  const searchRecipe = async (query = "") => {
    setIsLoading(true);
    setError(null);
    setRecipes([]); // Set recipes to an empty array instead of null
    try {
      const url = apiUrl + query;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      console.log("test");
      setRecipes(data.meals || []); // Ensure recipes is always an array
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchRecipe();
  }, []);

  useEffect(() => {
    if (query.length > 2) {
      searchRecipe(query); // Search when query is more than 2 characters
    } else if (query.length === 0) {
      searchRecipe(); // Reset to default when query is cleared
    }
  }, [query]);

  // Filter recipes by selected area
  let filterArea = area === "All" ? recipes : recipes.filter(recipe => recipe.strArea === area);

  return (
    <div>
      <div>
        <h1>Popular Food Recipes</h1>
        <div className="popular">
          <input
            className="input"
            type="text"
            placeholder="Search for a dish"
            value={query}
            onChange={(e) => {
              const value = e.target.value;
              setQuery(value); // Always update the query state
            }}
          />
        </div>

        {/* Recipe container div starts here */}
        <div className="recipe-container">
          {isLoading ? (
            <p className="para">Your recipe is being made 🍲</p>
          ) : recipes.length === 0 ? (
            <p className="para">Sorry, no recipe found :\</p>
          ) : (
            <Splide
              options={{ perPage: 5, gap: '1rem', pagination: true, drag: 'free', snap: true }}
            >
              {recipes.map((recipe) => (
                <SplideSlide key={recipe.idMeal}>
                  <div>
                    <h3>{recipe.strMeal}</h3>
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      style={{ width: "200px", height: "200px", borderRadius: "50px" }}
                    />
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          )}
        </div>
        {/* Recipe container div ends here */}
      </div>

      <div className="browse-area">
        <h3>Browse by Area/Country</h3>
        <div className="button-container">
          <button onClick={() => setArea("All")}>All</button>
          <button onClick={() => setArea("Indian")}>Indian</button>
          <button onClick={() => setArea("British")}>British</button>
          <button onClick={() => setArea("American")}>American</button>
          <button onClick={() => setArea("French")}>French</button>
        </div>

        {/* Display "Sorry, no recipe found" if filterArea is empty */}
        {filterArea.length === 0 ? (
          <p className="para">Sorry, no recipe found for {area} cuisine.</p>
        ) : (
          <Splide
            options={{ perPage: 5, gap: '1rem', pagination: true, drag: 'free', snap: true }}
          >
            {filterArea.map((recipe) => (
              <SplideSlide key={recipe.idMeal}>
                <div>
                  <h2>{recipe.strArea}</h2>
                  <h3>{recipe.strMeal}</h3>
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    style={{ width: "200px", height: "200px", borderRadius: "50px" }}
                  />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        )}
      </div>
    </div>
  );
}

export default PopularFood;
