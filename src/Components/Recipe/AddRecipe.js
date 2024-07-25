import React, { useState } from 'react';
import { addRecipe } from '../../Services/RecipeService';
import { Link } from 'react-router-dom';

const AddRecipe = () => {
    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');
    const [carbs, setCarbs] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [milkAllergen, setMilkAllergen] = useState(false);
    const [eggAllergen, setEggAllergen] = useState(false);
    const [nutAllergen, setNutAllergen] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await addRecipe({ 
                name, 
                calories, 
                protein, 
                fat, 
                carbs, 
                ingredients, 
                milkAllergen, 
                eggAllergen, 
                nutAllergen 
            });
            console.log('Recipe added successfully!');
            // Clear form fields
            setName('');
            setCalories('');
            setProtein('');
            setFat('');
            setCarbs('');
            setIngredients([]);
            setMilkAllergen(false);
            setEggAllergen(false);
            setNutAllergen(false);
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
    };

    const handleAddIngredient = () => {
        if (ingredients.length < 10) { // Limiting to 10 ingredients
            setIngredients([...ingredients, '']);
        } else {
            alert('Maximum number of ingredients reached.');
        }
    };

    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = value;
        setIngredients(updatedIngredients);
    };

    const handleRemoveIngredient = (index) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
    };

    return (
        <html lang="en">
            <head>
                <title>Add Recipe</title>
                {/* Include Bootstrap CSS */}
                <link
                    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
                    rel="stylesheet"
                />
                <link href="styles.css" rel="stylesheet" />
            </head>
            <body>
                <header className="header-3 text-center mb-4">
                    <h1 className="mb-4">Create a New Recipe</h1>
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
                    <h2>Add Recipe</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Recipe Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Calories:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={calories}
                                onChange={(e) => setCalories(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Protein:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={protein}
                                onChange={(e) => setProtein(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Fat:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={fat}
                                onChange={(e) => setFat(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Carbs:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={carbs}
                                onChange={(e) => setCarbs(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Ingredients:</label>
                            {ingredients.map((ingredient, index) => (
                                <div key={index} className="ingredient-input row align-items-center">
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={ingredient}
                                            onChange={(e) => handleIngredientChange(index, e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <button type="button" onClick={() => handleRemoveIngredient(index)} className="btn btn-danger">Remove</button>
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={handleAddIngredient} className="btn btn-primary mt-2">Add Ingredient</button>
                        </div>
                        <div className="form-group">
                            <label>Allergen Restrictions:</label>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="milkAllergen"
                                    name="milkAllergen"
                                    checked={milkAllergen}
                                    onChange={(e) => setMilkAllergen(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="milkAllergen">Milk Allergen</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="eggAllergen"
                                    name="eggAllergen"
                                    checked={eggAllergen}
                                    onChange={(e) => setEggAllergen(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="eggAllergen">Egg Allergen</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="nutAllergen"
                                    name="nutAllergen"
                                    checked={nutAllergen}
                                    onChange={(e) => setNutAllergen(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="nutAllergen">Nut Allergen</label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Add Recipe</button>
                    </form>
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

export default AddRecipe;
