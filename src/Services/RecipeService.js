import Parse from 'parse';

// Fetch all recipes for the current user
export const fetchRecipes = async (user) => {
    const Recipe = Parse.Object.extend('Recipe');
    const query = new Parse.Query(Recipe);

    query.equalTo('user', user);

    try {
        const results = await query.find();
        return results.map(result => ({
            id: result.id,
            attributes: {
                name: result.get('name'),
                calories: result.get('calories'),
                protein: result.get('protein'),
                fat: result.get('fat'),
                carbs: result.get('carbs'),
                ingredients: result.get('Ingredients') || []
            }
        }));
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};

// Add a new recipe for the current user
export const addRecipe = async ({ name, calories, protein, fat, carbs, ingredients }) => {
    const Recipe = Parse.Object.extend('Recipe');
    const recipe = new Recipe();

    const currentUser = Parse.User.current();

    recipe.set('user', currentUser);
    recipe.set('name', name);
    recipe.set('calories', parseFloat(calories));
    recipe.set('protein', parseFloat(protein));
    recipe.set('fat', parseFloat(fat));
    recipe.set('carbs', parseFloat(carbs));
    recipe.set('Ingredients', ingredients);

    try {
        await recipe.save();
        console.log('Recipe added:', { name, calories, protein, fat, carbs, ingredients });
    } catch (error) {
        console.error('Error adding recipe:', error);
        throw error;
    }
};
