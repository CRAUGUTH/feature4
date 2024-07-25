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

    useLayoutEffect(() => {
        async function fetchUserRecipes() {
            try {
                const currentUser = getUser();
                const fetchedRecipes = await fetchRecipes(currentUser);
                
                // Calculate calories for each recipe
                const recipesWithCalories = fetchedRecipes.map(recipe => {
                    const { protein, carbs, fat } = recipe.attributes;
                    const calories = calculateCalories(protein, carbs, fat);
                    return { ...recipe, attributes: { ...recipe.attributes, calories } };
                });

                setRecipes(recipesWithCalories);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        }

        fetchUserRecipes();
    }, []);

    return (
        <html lang="en">
            <head>
                <title>Saved Recipes</title>
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
                    {/* General Information */}
                    {recipes.length > 0 ? (
                        <ul className="list-unstyled">
                            {recipes.map((recipe) => (
                                <li key={recipe.id} className="recipe-box">
                                    <div>
                                        <h3><b>{recipe.attributes.name}</b></h3>
                                        <h4>Calories: {recipe.attributes.calories}</h4>
                                        <ul>
                                            <li>Protein: {recipe.attributes.protein}</li>
                                            <li>Fat: {recipe.attributes.fat}</li>
                                            <li>Carbs: {recipe.attributes.carbs}</li>
                                        </ul>
                                        <br />
                                        <h5>Main Ingredients:</h5>
                                        <ul>
                                            {/* Ensure ingredients is properly handled */}
                                            {recipe.attributes.ingredients.map((ingredient, index) => (
                                                <li key={index}>{ingredient}</li>
                                            ))}
                                        </ul>
                                        <Link to={`/edit-recipe/${recipe.id}`} className="btn btn-primary mt-2">
                                            Edit
                                        </Link>
                                    </div>
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
