import React, { useEffect, useState } from 'react';
import { Button, Select } from "flowbite-react";
import { FaEarthAfrica } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./Home.style.css";
import axios from 'axios';

const Home = ({ base_url }) => {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${base_url}categories.php`);
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch all meals
  const getAllMeals = async () => {
    try {
      const { data } = await axios.get(`${base_url}search.php?s=`);
      setMeals(data.meals || []);
      setSelectedCategory("All");
    } catch (error) {
      console.error("Error fetching all meals:", error);
    }
  };

  // Fetch meals for a category
  const getMealsByCategory = async (category) => {
    if (category === "All") {
      getAllMeals();
      return;
    }
    try {
      const { data } = await axios.get(`${base_url}filter.php?c=${category}`);
      setMeals(data.meals || []);
      setSelectedCategory(category);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  useEffect(() => {
    getCategories();
    getAllMeals();
  }, []);

  return (
    <div
      className="home max-sm:mt-15 max-lg:mt-15"
      style={{ backgroundColor: "#f4f2ee", minHeight: "100vh", padding: "20px" }}
    >
      <h1
        className="text-4xl font-normal mb-10 bg-gradient-to-r from-orange-500 via-orange-700 to-red-600  
      bg-clip-text text-transparent"
        style={{ fontFamily: "'Pacifico', cursive" }}
      >
        Learn, Cook, Eat Your Food
      </h1>

      {/* Mobile: Dropdown */}
      <div className="block md:hidden mb-6">
        <Select
          value={selectedCategory}
          onChange={(e) => getMealsByCategory(e.target.value)}
          className="bg-[#f4f2ee] border border-gray-400"
        >
          <option value="All">All</option>
          {categories.map((cat) => (
            <option key={cat.idCategory} value={cat.strCategory}>
              {cat.strCategory}
            </option>
          ))}
        </Select>
      </div>

      {/* Desktop: Category Buttons */}
      <div className="hidden md:flex flex-wrap gap-2 mb-6">
        <Button
          onClick={() => getMealsByCategory("All")}
          className={`px-4 py-2 rounded-full border border-gray-400 transition-transform duration-200 ease-in-out
            ${
              selectedCategory === "All"
                ? "bg-black text-white scale-105"
                : "bg-[#f4f2ee] hover:bg-[#fff] text-gray-800"
            } hover:scale-105`}
        >
          All
        </Button>

        {categories.map((cat) => (
          <Button
            key={cat.idCategory}
            onClick={() => getMealsByCategory(cat.strCategory)}
            className={`px-4 py-2 rounded-full border border-gray-400 transition-transform duration-200 ease-in-out
              ${
                selectedCategory === cat.strCategory
                  ? "bg-black text-white scale-105"
                  : "bg-[#f4f2ee] hover:bg-[#fff] text-gray-800"
              } hover:scale-105`}
          >
            {cat.strCategory}
          </Button>
        ))}
      </div>

      {/* Meals List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 gap-y-15 mt-20">
          {meals.map((meal) => (
            <div
              key={meal.idMeal}
              className=" meal-card bg-white rounded-4xl shadow hover:shadow-lg transition p-4 flex flex-col items-center"
            >
              {/* Meal Image */}
              <div className="meal-item w-70 rounded-full overflow-hidden border-white shadow-md -mt-14 bg-white">
                
                {
                  meal.strMealThumb ? <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-full object-cover"
                /> : ""
                }
                
              </div>

              {/* Meal Name */}
              <p className={`text-center font-medium mt-4 text-gray-800 ${
                meal.strMealThumb ? " " : "mt-15"
              }`}>
                {meal.strMeal}
              </p>

              {/* Meal Name */}
              <p className="text-center font-medium mt-4 text-[#059669] flex items-center justify-center gap-2">
                <FaEarthAfrica />
                {meal.strArea}
              </p>

              {/* View Recipe Button */}
              <Link
                to={`/mealdetail/${meal.idMeal}`}
                className="mt-3 inline-block bg-[#21ba75] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
              >
                View Recipe
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Home;
