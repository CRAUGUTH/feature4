import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateRecipe } from '../../Services/RecipeService';
import Parse from 'parse';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [carbs, setCarbs] = useState('');
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const Recipe = Parse.Object.extend('Recipe');
      const query = new Parse.Query(Recipe);
      try {
        const recipe = await query.get(id);
        setRecipe(recipe);
        setName(recipe.get('name'));
        setCalories(recipe.get('calories'));
        setProtein(recipe.get('protein'));
        setFat(recipe.get('fat'));
        setCarbs(recipe.get('carbs'));
        setIngredients(recipe.get('Ingredients') || []);
      } catch (error) {
        console.error('Error while fetching recipe', error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRecipe({ 
        id, 
        name, 
        calories, 
        protein, 
        fat, 
        carbs, 
        ingredients 
      });
      navigate('/list');
    } catch (error) {
      console.error('Error while updating recipe', error);
      alert('Failed to update recipe');
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

  if (!recipe) return <div>Loading...</div>;

  return (
    <html lang="en">
      <head>
        <title>Edit Recipe</title>
        <link
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link href="styles.css" rel="stylesheet" />
      </head>
      <body>
        <header className="header-3 text-center mb-4">
          <h1 className="mb-4">Edit Recipe</h1>
          <nav>
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <a className="nav-link" href="/">Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/add">Create New Recipe</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/list">All Recipes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/liveList">Live Recipe List</a>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container">
          <h2>Edit Recipe</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
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
                type="number"
                className="form-control"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Protein:</label>
              <input
                type="number"
                className="form-control"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Fat:</label>
              <input
                type="number"
                className="form-control"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Carbs:</label>
              <input
                type="number"
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
            <button type="submit" className="btn btn-primary mt-3">Update Recipe</button>
          </form>
        </main>
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

export default EditRecipe;
