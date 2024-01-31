const scaleRecipe = (originalRecipe, newServingSize) => {
    const scaleFactor = newServingSize / originalRecipe.servingSize.servings;

    const scaledIngredients = originalRecipe.ingredients.map(ingredient => {
        return {
            quantity: Math.ceil(ingredient.quantity * scaleFactor * 10) / 10,
            unit: ingredient.unit,
            name: ingredient.name,
        };
    });

    const scaledNutrition = {
        calories: Math.ceil(originalRecipe.servingSize.nutrition.calories * scaleFactor),
        carbs: Math.ceil(originalRecipe.servingSize.nutrition.carbs * scaleFactor),
        protein: Math.ceil(originalRecipe.servingSize.nutrition.protein * scaleFactor),
        fat: Math.ceil(originalRecipe.servingSize.nutrition.fat * scaleFactor),
    };

    return {
        ...originalRecipe,
        ingredients: scaledIngredients,
        servingSize: {
            ...originalRecipe.servingSize,
            servings: newServingSize,
            nutrition: scaledNutrition,
        },
    };
};

export default scaleRecipe;