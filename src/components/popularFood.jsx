import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import truckutensils from '../images/truck-utensils.png';

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function PopularFood() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [area, setArea] = useState("All");
  const [popupContent, setPopupContent] = useState({ image: null, ingredients: null, instructions: null ,meal : null});


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
      console.log(data);
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

  const handleImageClick = (imageSrc, ingredients, instructions,meal) => {
    setPopupContent({ image: imageSrc, ingredients: ingredients , instructions: instructions, meal : meal});
  };

  const closePopup = () => {
    setPopupContent({ image: null, ingredients: null , instructions: null ,meal : null});
  };
 
  // Filter recipes by selected area
  let filterArea = area === "All" ? recipes : recipes.filter(recipe => recipe.strArea === area);

  return (
     
      <div>
        <div>
        <header>
        <div class="navbar">
            <div class="logo">
                <img src={truckutensils} alt="Logo"/> 
                <span>Recipe Finder</span>
            </div>
            <nav>
                <ul>
                    <li><a href="#">About us</a></li>
                    
                   
                </ul>
            </nav>
        </div>
    </header>
        <div className="footer-logo">
 
</div>
<div className="popular-container">
  <div className="popular">
    <input
      className="input"
      type="text"
      placeholder="Search for a dish"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    <h4 className="heading">Popular Food Recipes</h4>
  </div>
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
                 <div className="recipe-item">
                   <img 
                     onClick={() => handleImageClick(recipe.strMealThumb, {
                       ingredient1: recipe.strIngredient1,
                       ingredient2: recipe.strIngredient2,
                       ingredient3: recipe.strIngredient3,
                       ingredient4: recipe.strIngredient4,
                       ingredient5: recipe.strIngredient5,
                       ingredient6: recipe.strIngredient6,
                       ingredient7: recipe.strIngredient7,
                       ingredient8: recipe.strIngredient8,
                       ingredient9: recipe.strIngredient9,
                     }, recipe.strInstructions, recipe.strMeal)}
                     src={recipe.strMealThumb}
                     alt={recipe.strMeal}
                     style={{ width: "200px", height: "200px", borderRadius: "50px", cursor: "pointer" }}
                   />
                   <h3 className="recipe-title">{recipe.strMeal}</h3>
                 </div>
               </SplideSlide>
               
                ))}
              </Splide>
            )}
          </div>
        </div>
    
        <div className="browse-area">
          <h4 className="filter-area">Filter By Cuisine </h4>
          <div className="button-container">
            <button onClick={() => setArea("All")}> View All</button>
            <button onClick={() => setArea("Indian")}>Indian</button>
            <button onClick={() => setArea("British")}>British</button>
            <button onClick={() => setArea("American")}>American</button>
            <button onClick={() => setArea("French")}>French</button>
          </div>
    
          
          {filterArea.length === 0 ? (
            <p className="para">Sorry, no recipe found for {area} cuisine.</p>
          ) : (
            <Splide
              options={{ perPage: 5, gap: '1rem', pagination: true, drag: 'free', snap: true }}
            >
              {filterArea.map((recipe) => (
                <SplideSlide key={recipe.idMeal}>
                  <div className="recipe-item">
                    <img 
                      onClick={() => handleImageClick(recipe.strMealThumb, 
                        {
                          ingredient1: recipe.strIngredient1,
                          ingredient2: recipe.strIngredient2,
                          ingredient3: recipe.strIngredient3,
                          ingredient4: recipe.strIngredient4,
                          ingredient5: recipe.strIngredient5,
                          ingredient6: recipe.strIngredient6,
                          ingredient7: recipe.strIngredient7,
                          ingredient8: recipe.strIngredient8,
                          ingredient9: recipe.strIngredient9,
                        }, recipe.strInstructions, recipe.strMeal)}

                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      style={{ width: "200px", height: "200px", borderRadius: "50px", cursor: "pointer" }}
                    />
                    <h3 className="recipe-title">{recipe.strMeal}</h3>
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          )}
          
        </div>
    
        {/* Popup */}
        
        {popupContent.image && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content">
          {popupContent.meal && (
            <div className="meal-popup">
              <div className="meal-para">
              <h2>{popupContent.meal}</h2>
              </div>
            </div>)}
            <img src={popupContent.image} alt="Popup" />
            {popupContent.ingredients && (
              <div className="ingredients-popup">
                <h3>Ingredients:</h3>
                <div className="ingredients-para">
                <p>{popupContent.ingredients.ingredient1}</p>
                 <p>{popupContent.ingredients.ingredient2}</p>
                <p>{popupContent.ingredients.ingredient3}</p> 
                <p>{popupContent.ingredients.ingredient5}</p> 
                <p>{popupContent.ingredients.ingredient6}</p> 
                <p>{popupContent.ingredients.ingredient7}</p> 
                <p>{popupContent.ingredients.ingredient8}</p> 
                </div>
              </div>
            )
            }
            {popupContent.instructions && (
              <div className="instructions-popup">
              <h3>Instructions</h3>
              <div className="instructions-para">
              <p>{popupContent.instructions}</p>
              </div>
            </div>)}
            
          
          </div>
        </div>
      )}
       <footer>
        <div className="footer-container">
            <div className="footer-logo">
              
                
            </div>
            <div className="footer-content">
                <div className="footer-column">
                    <h3>ABOUT US</h3>
                    <ul>
                        <li><a href="#">Our Company</a></li>
                        <li><a href="#">Media Center</a></li>
                        <li><a href="#">History</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Leadership</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>NEED HELP?</h3>
                    <ul>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Sitemap</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <ul>
                        <li><a href="#">Terms of Use</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Do Not Sell My Personal Information</a></li>
                        <li><a href="#">Cookie Preferences</a></li>
                        <li><a href="#">Disclaimer</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
   


    </div> 
     
  
  );
}

export default PopularFood;

