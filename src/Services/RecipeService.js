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
                ingredients: result.get('Ingredients') || [],
                milkAllergen: result.get('milkAllergen'),
                eggAllergen: result.get('eggAllergen'),
                nutAllergen: result.get('nutAllergen')
            }
        }));
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};

export const LiveRecipes = async (user) => {
    const Recipe = Parse.Object.extend('Recipe');
    const query = new Parse.Query(Recipe);

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
export const addRecipe = async ({ name, calories, protein, fat, carbs, ingredients, milkAllergen, eggAllergen, nutAllergen }) => {
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
    recipe.set('milkAllergen', milkAllergen);
    recipe.set('eggAllergen', eggAllergen);
    recipe.set('nutAllergen', nutAllergen);

    try {
        await recipe.save();
        console.log('Recipe added:', { name, calories, protein, fat, carbs, ingredients, milkAllergen, eggAllergen, nutAllergen });
    } catch (error) {
        console.error('Error adding recipe:', error);
        throw error;
    }
};

// Update an existing recipe
export const updateRecipe = async ({ id, name, calories, protein, fat, carbs, ingredients, milkAllergen, eggAllergen, nutAllergen }) => {
    const Recipe = Parse.Object.extend('Recipe');
    const query = new Parse.Query(Recipe);

    try {
        const recipe = await query.get(id);
        recipe.set('name', name);
        recipe.set('calories', parseFloat(calories));
        recipe.set('protein', parseFloat(protein));
        recipe.set('fat', parseFloat(fat));
        recipe.set('carbs', parseFloat(carbs));
        recipe.set('Ingredients', ingredients);
        recipe.set('milkAllergen', milkAllergen);
        recipe.set('eggAllergen', eggAllergen);
        recipe.set('nutAllergen', nutAllergen);

        await recipe.save();
        console.log('Recipe updated:', { id, name, calories, protein, fat, carbs, ingredients, milkAllergen, eggAllergen, nutAllergen });
    } catch (error) {
        console.error('Error updating recipe:', error);
        throw error;
    }
};
