import Parse from 'parse';

// Fetch all recipes for 'Conner'
export const fetchRecipes = async () => {
    const Recipe = Parse.Object.extend('Recipe');
    const query = new Parse.Query(Recipe);

    // Replace 'xyz123abc456' with the actual objectId of 'Conner'
    const userObjectId = 'n4WMECuHcw'; // Replace with the actual objectId of 'Conner'
    const user = Parse.User.createWithoutData(userObjectId);

    query.equalTo('user', user);

    try {
        const results = await query.find();
        console.log('Recipes fetched for user:', userObjectId, results);
        return results;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};

// Add a new recipe
export const addRecipe = async ({ name, calories, protein, fat, carbs }) => {
    const Recipe = Parse.Object.extend('Recipe');
    const recipe = new Recipe();

    // Replace 'xyz123abc456' with the actual objectId of 'Conner'
    const userObjectId = 'n4WMECuHcw'; // Replace with the actual objectId of 'Conner'

    recipe.set('user', Parse.User.createWithoutData(userObjectId));
    recipe.set('name', name);
    recipe.set('calories', parseFloat(calories));
    recipe.set('protein', parseFloat(protein));
    recipe.set('fat', parseFloat(fat));
    recipe.set('carbs', parseFloat(carbs));

    try {
        await recipe.save();
        console.log('Recipe added for user:', userObjectId, { name, calories, protein, fat, carbs });
    } catch (error) {
        console.error('Error adding recipe:', error);
        throw error;
    }
};
