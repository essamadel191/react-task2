import React, { useEffect, useState } from "react";
import { FaEarthAfrica } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MealDetail.style.css";

const MealDetail = ({ base_url }) => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchMealDetail = async () => {
      try {
        const { data } = await axios.get(`${base_url}lookup.php?i=${id}`);
        const mealData = data.meals ? data.meals[0] : null;
        setMeal(mealData);

        if (mealData) {
          const ing = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = mealData[`strIngredient${i}`];
            const measure = mealData[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== "") {
              ing.push({ name: ingredient, amount: measure });
            }
          }
          setIngredients(ing);
        }
      } catch (error) {
        console.error("Error fetching meal details:", error);
      }
    };

    fetchMealDetail();
  }, [id, base_url]);

  if (!meal) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 overflow-hidden min-h-screen">
      <div className="container p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          
          {/* Left/Main Content */}
          <div className="lg:w-2/3">
            <h1 className="text-5xl font-semibold mb-4 md:mb-4 font-Pacifico">{meal.strMeal}</h1>

            <div className="grid lg:grid-cols-2 gap-4 items-stretch">
              {/* Image & Links */}
              <div>
                <img 
                  className="w-full rounded-2xl mb-8" 
                  src={meal.strMealThumb} 
                  alt={meal.strMeal} 
                />
                <ul className="flex justify-center gap-4">
                  <li className="bg-red-600 text-white py-2 px-4 rounded-lg">
                    <a 
                      target="_blank" 
                      rel="noopener noreferrer"
                      href={meal.strYoutube} 
                      className="flex items-center justify-center gap-2"
                    >
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
                      </svg>
                      YouTube
                    </a>
                  </li>

                  <li className="bg-gray-700 text-white py-2 px-4 rounded-lg">
                    <a 
                      target="_blank" 
                      rel="noopener noreferrer"
                      href={meal.strSource} 
                      className="flex items-center justify-center gap-2"
                    >
                      <FaEarthAfrica/>
                      Source
                    </a>
                  </li>
                </ul>
              </div>

              {/* Description */}
              <p className="font-Pacifico">
                {meal.strInstructions}
              </p>
            </div>
          </div>

          {/* Right/Sidebar */}
          <div className="lg:w-1/3 p-4">
            <div className="bg-white rounded-2xl p-4">
              <h3 className="text-2xl font-semibold mb-4 border-b-4 border-gray-200 p-2">Ingredients</h3>
              {ingredients.length > 0 ? (
                ingredients.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between p-2 border-b-2 border-gray-200 last:border-b-0"
                  >
                    <span>{item.name}:</span>
                    <span>{item.amount}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No ingredients available</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MealDetail;
