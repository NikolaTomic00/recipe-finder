// DOM Elements
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const mealsContainer = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const errorContainer = document.getElementById("error-container");
const mealDetails = document.getElementById("meal-details");
const mealDetailsContent = document.querySelector(".meal-details-content");
const backBtn = document.getElementById("back-btn");

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";
const SEARCH_URL = `${BASE_URL}search.php?s=`;
const LOOKUP_URL = `${BASE_URL}lookup.php?i=`;

searchBtn.addEventListener("click", searchMeals);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchMeals();
  }
});

async function searchMeals() {
  const searchTerm = searchInput.value.trim();

  if (!searchTerm) {
    errorContainer.textContent = "Please enter meals or keywords";
    errorContainer.classList.remove("hidden");
    return;
  }
  try {
    resultHeading.textContent = `Searching for the ${searchTerm} ...`;
    mealsContainer.innerHTML = "";
    errorContainer.classList.remove("hidden");

    const response = await fetch(`${SEARCH_URL}${searchTerm}`);
    const data = await response.json();

    if (data.meals === null) {
      resultHeading.textContent = "";
      errorContainer.textContent = `Sorry cant find anything related to ${searchTerm}. Please type something else`;
      errorContainer.classList.remove("hidden");
      return;
    } else {
      resultHeading.textContent = `Results for the ${searchTerm}`;
      displayMeals(data.meals);
    }
  } catch (error) {
    errorContainer.textContent =
      "Something went wrong. Please try again later.";
    errorContainer.classList.remove("hidden");
  }
}
