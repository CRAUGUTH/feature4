import React, { useLayoutEffect, useState } from 'react';
import { LiveRecipes } from '../../Services/RecipeService';
import { Link } from 'react-router-dom';
import { getUser } from '../../Services/Auth/AuthService';
import './styles.css';

// RecipeList Component
const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState('');
    const [searchTerms, setSearchTerms] = useState([]);

    useLayoutEffect(() => {
        async function fetchUserRecipes() {
            try {
                const currentUser = getUser();
                const fetchedRecipes = await LiveRecipes(currentUser);
                setRecipes(fetchedRecipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        }

        fetchUserRecipes();
    }, []);

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && query.trim()) {
            const trimmedQuery = query.trim();
            if (!searchTerms.includes(trimmedQuery)) {
                setSearchTerms([...searchTerms, trimmedQuery]);
            }
            setQuery('');
        }
    };

    const handleClearAll = () => {
        setSearchTerms([]);
        setQuery('');
    };

    const handleDelete = (termToDelete) => {
        setSearchTerms(searchTerms.filter(term => term !== termToDelete));
    };

    const highlightMatch = (text, terms) => {
        let highlightedText = text;
        terms.forEach((term) => {
            const regex = new RegExp(`\\b(${term})\\b`, 'gi');
            highlightedText = highlightedText.replace(regex, '<span class="highlight">$1</span>');
        });
        return highlightedText;
    };

    // Filter recipes based on search terms
    const filteredRecipesByTerms = recipes
        .map(recipe => {
            const matchingIngredients = recipe.attributes.ingredients.filter(ingredient =>
                searchTerms.some(term =>
                    ingredient.toLowerCase() === term.toLowerCase()
                )
            );

            return {
                ...recipe,
                matchingCount: matchingIngredients.length,
                matchingIngredients
            };
        })
        .filter(recipe => recipe.matchingCount > 0)
        .sort((a, b) => b.matchingCount - a.matchingCount);

    // Real-time search based on the current query
    const realTimeFilteredRecipes = recipes
        .filter(recipe => recipe.attributes.ingredients.some(ingredient =>
            ingredient.toLowerCase().includes(query.toLowerCase())
        ));

    const shouldShowSearchTermsResults = searchTerms.length > 0 && query.trim() === '';

    return (
        <div>
            <header className="text-center mb-4">
                <h1 className="mb-4">Search by ingredient!</h1>
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
            <main className="search-container">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by ingredients..."
                        value={query}
                        onChange={handleQueryChange}
                        onKeyDown={handleKeyDown}
                        className="form-control search-input"
                    />
                    <button
                        type="button"
                        className="btn btn-secondary ml-2 clear"
                        onClick={handleClearAll}
                    >
                        Clear All
                    </button>
                    <div className="mt-2 badge-container">
                        {searchTerms.map((term, index) => (
                            <span key={index} className="badge badge-primary badge-spacing items-searched">
                                {term}
                                <button
                                    type="button"
                                    className="btn btn-sm red-button"
                                    onClick={() => handleDelete(term)}
                                >
                                    X
                                </button>
                                <br />
                            </span>
                        ))}
                    </div>
                </div>
                <div className="recipe-list-container">
                    <ul className="list-unstyled">
                        {(shouldShowSearchTermsResults ? filteredRecipesByTerms : realTimeFilteredRecipes).length > 0 ? (
                            (shouldShowSearchTermsResults ? filteredRecipesByTerms : realTimeFilteredRecipes).map((recipe) => (
                                <li key={recipe.id} className="recipe-box">
                                    <div>
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
                                                <li key={index} dangerouslySetInnerHTML={{ __html: highlightMatch(ingredient, searchTerms) }}></li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No recipes found.</p>
                        )}
                    </ul>
                </div>
            </main>
            <footer className="text-center mt-4">
                <p>
                    Find us on LinkedIn
                    <a href="https://www.linkedin.com/in/connerrauguth" target="_blank" rel="noopener noreferrer"> Conner Rauguth </a>
                    |
                    <a href="https://www.linkedin.com/in/michael-danzi-559770214/" target="_blank" rel="noopener noreferrer"> Michael Danzi</a>
                </p>
            </footer>
        </div>
    );
};

export default RecipeList;

