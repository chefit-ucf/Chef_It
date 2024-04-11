const scaleRecipe = (originalRecipe, newServingSize) => {
    if (typeof originalRecipe.ingredients !== 'object') {
        console.error("Ingredients is not an object:", originalRecipe.ingredients);
        return originalRecipe;
    }

    const ingredientsArray = Object.values(originalRecipe.ingredients);

    const scaleFactor = newServingSize / originalRecipe.servingSize.serving;
console.log("New Serving Size:", newServingSize)
console.log("originalRecipe.servingSize.servings:", originalRecipe.servingSize.serving)
    console.log("Scale Factor:", scaleFactor);

    const scaledIngredients = ingredientsArray.map(ingredient => {
        const quantity = parseFloat(ingredient.quantity);
        console.log("Parsed Quantity:", ingredient.name, quantity);

        if (isNaN(quantity)) {
            console.error("Quantity is not a valid number for ingredient:", ingredient.name);
            return null;
        }

        const scaledQuantity = Math.ceil(quantity * scaleFactor * 10) / 10;
        console.log("Scaled Quantity:", scaledQuantity);

        return {
            quantity: scaledQuantity,
            unit: ingredient.unit,
            name: ingredient.name,
        };
    });

    console.log("Scaled Ingredients:", scaledIngredients);

    if (scaledIngredients.some(ingredient => ingredient === null)) {
        console.error("Some ingredients have invalid quantities. Scaling aborted.");
        return originalRecipe;
    }

    const { nutrition } = originalRecipe.servingSize;
    if (!nutrition || typeof nutrition !== 'object') {
        console.error("Nutrition data is missing or invalid:", nutrition);
        return originalRecipe;
    }

    const scaledNutrition = {
        calories: Math.ceil(nutrition.calories * scaleFactor),
        carbs: Math.ceil(nutrition.carbs * scaleFactor),
        protein: Math.ceil(nutrition.protein * scaleFactor),
        fat: Math.ceil(nutrition.fat * scaleFactor),
    };

    console.log("Scaled Nutrition:", scaledNutrition);

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