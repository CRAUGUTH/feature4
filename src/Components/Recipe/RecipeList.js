import React, { useLayoutEffect, useState } from 'react';
import { fetchRecipes } from '../../Services/RecipeService';
import { Link } from 'react-router-dom';
import { getUser } from '../../Services/Auth/AuthService';
import './styles.css';

// Function to calculate calories from macronutrients
const calculateCalories = (protein, carbs, fat) => {
    return (protein * 4) + (carbs * 4) + (fat * 9);
};

// RecipeList Component
const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [allergens, setAllergens] = useState({
        milkAllergen: false,
        eggAllergen: false,
        nutAllergen: false,
    });

    useLayoutEffect(() => {
        async function fetchUserRecipes() {
            try {
                const currentUser = getUser();
                const fetchedRecipes = await fetchRecipes(currentUser);
                
                // Calculate calories for each recipe
                const recipesWithCalories = fetchedRecipes.map(recipe => {
                    const { protein, carbs, fat, milkAllergen, eggAllergen, nutAllergen } = recipe.attributes;
                    const calories = calculateCalories(protein, carbs, fat);
                    // Include allergens in the attributes
                    return {
                        ...recipe,
                        attributes: {
                            ...recipe.attributes,
                            calories,
                            milkAllergen,
                            eggAllergen,
                            nutAllergen,
                        }
                    };
                });

                setRecipes(recipesWithCalories);
                setFilteredRecipes(recipesWithCalories);

            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        }

        fetchUserRecipes();
    }, []);

    const handleAllergenChange = (e) => {
        const { name, checked } = e.target;
        setAllergens((prevAllergens) => ({
            ...prevAllergens,
            [name]: checked,
        }));
    };

    const filterRecipes = () => {
        setFilteredRecipes(
            recipes.filter(recipe => {
                const { milkAllergen, eggAllergen, nutAllergen } = allergens;
                return (!milkAllergen || !recipe.attributes.milkAllergen) &&
                       (!eggAllergen || !recipe.attributes.eggAllergen) &&
                       (!nutAllergen || !recipe.attributes.nutAllergen);
            })
        );
    };

    return (
        <html lang="en">
            <head>
                <title>Recipe List</title>
                {/* Include Bootstrap CSS */}
                <link
                    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
                    rel="stylesheet"
                />
                <link href="styles.css" rel="stylesheet" />
            </head>
            <body>
                <header className="header-2 text-center mb-4">
                    <h1 className="mb-4">Saved Recipes</h1>
                    {/* Internal Links */}
                    <nav>
                        <ul className="nav justify-content-center">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/add">Create New Recipe</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/list">All Recipes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/liveList">Live Recipe List</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main className="container">
                    <div className="allergen-filter mb-4">
                        <h3>Filter by Allergens</h3>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="milkAllergen"
                                name="milkAllergen"
                                checked={allergens.milkAllergen}
                                onChange={handleAllergenChange}
                            />
                            <label className="form-check-label" htmlFor="milkAllergen">Milk Allergen</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="eggAllergen"
                                name="eggAllergen"
                                checked={allergens.eggAllergen}
                                onChange={handleAllergenChange}
                            />
                            <label className="form-check-label" htmlFor="eggAllergen">Egg Allergen</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="nutAllergen"
                                name="nutAllergen"
                                checked={allergens.nutAllergen}
                                onChange={handleAllergenChange}
                            />
                            <label className="form-check-label" htmlFor="nutAllergen">Nut Allergen</label>
                        </div>
                        <button className="btn btn-primary mt-2" onClick={filterRecipes}>Apply Filter</button>
                    </div>
                    {/* Recipe List */}
                    <h2>Recipe List</h2>
                    {filteredRecipes.length > 0 ? (
                        <ul className="list-unstyled">
                            {filteredRecipes.map((recipe) => (
                                <li key={recipe.id} className="recipe-box mb-3 p-3 border rounded">
                                    <h3><b>{recipe.attributes.name}</b></h3>
                                    <h4>Calories: {recipe.attributes.calories}</h4>
                                    <ul>
                                        <li>Protein: {recipe.attributes.protein}</li>
                                        <li>Fat: {recipe.attributes.fat}</li>
                                        <li>Carbs: {recipe.attributes.carbs}</li>
                                    </ul>
                                    <h5>Main Ingredients:</h5>
                                    <ul>
                                        {recipe.attributes.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))}
                                    </ul>
                                    <Link to={`/edit-recipe/${recipe.id}`} className="btn btn-primary mt-2">
                                        Edit
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No recipes found.</p>
                    )}
                </main>
                {/* Links to Socials */}
                <footer className="text-center mt-4">
                    <p>
                        Find us on LinkedIn
                        <a href="https://www.linkedin.com/in/connerrauguth" target="_blank" rel="noopener noreferrer"> Conner Rauguth </a>
                        |
                        <a href="https://www.linkedin.com/in/michael-danzi-559770214/" target="_blank" rel="noopener noreferrer"> Michael Danzi</a>
                    </p>
                </footer>
            </body>
        </html>
    );
};

export default RecipeList;
