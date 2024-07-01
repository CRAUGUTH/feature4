import React, { useState } from 'react';
import { addRecipe } from '../../Services/RecipeService';
import { Link } from 'react-router-dom';

const AddRecipe = () => {
    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');
    const [carbs, setCarbs] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addRecipe({ name, calories, protein, fat, carbs, user: 'Conner' }); // Pass 'Conner' as the user identifier
        setName('');
        setCalories('');
        setProtein('');
        setFat('');
        setCarbs('');
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
                <header className="text-center mb-4">
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
