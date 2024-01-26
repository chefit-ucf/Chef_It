export const recipeData = {
    "recipeId": {
        "re001" : {
            title: 'Chocolate Chip Cookies',
            username: 'user002',
            rating: '★ ★ ★ ★',
            src: require('../assets/recipes/chocolateChipCookies.jpg'),
            ingredients: [
                { quantity: 1/2, unit: 'cup', name: 'sugar' },
                { quantity: 3/4, unit: 'cup', name: 'brown sugar' },
                { quantity: 1, unit: 'tsp', name: 'salt' },
                { quantity: 1/2, unit: 'cup', name: 'butter (melted)' },
                { quantity: 1, unit: 'egg', name: 'egg' },
                { quantity: 1, unit: 'tsp', name: 'vanilla extract' },
                { quantity: 1.25, unit: 'cup', name: 'all-purpose flour' },
                { quantity: 1/2, unit: 'tsp', name: 'baking soda' },
                { quantity: 4, unit: 'oz', name: 'milk/semi-sweet chips' },
                { quantity: 4, unit: 'oz', name: 'dark chocolate chunks' }
            ],
            directions: [
                { text: 'In a pot, warm olive oil on medium high. Saute onion & carrots for 4 mins (until soft)', checkpoint: 0 },
                { text: 'Add garlic & cook for 30 seconds', checkpoint: 60 },
                { text: 'Season with salt, pepper, thyme, & red pepper flakes', checkpoint: 300},
                { text: 'Pour in chicken broth & soup to a boil', checkpoint: 420 },
                { text: 'Add rice & reduce heat to a simmer, stirring occasionally for 20 mins', checkpoint: 540 },
                { text: 'Stir in shredded chicken', checkpoint: 660 },
                { text: 'Let cool & enjoy!', checkpoint: 1080 }
            ],
            timer: {
                duration: 40,
                unit: 'minutes',
            },
            servingSize: {
                servings: 24,
                ingredients: 10,
                nutrition: {
                    calories: 150, 
                    carbs: 20, 
                    protein: 2, 
                    fat: 7, 
                }
            }
        },
        "re002" : {
            title: 'Chicken & Rice Soup',
            username: 'user001',
            rating: '★ ★ ★ ★',
            src: require('../assets/recipes/chickenRiceSoup.jpg'),
            ingredients: [
                { quantity: 2, unit: 'tbsp', name: 'olive oil' },
                { quantity: 1, unit: 'diced', name: 'medium onion' },
                { quantity: 2, unit: 'diced', name: 'medium carrots' },
                { quantity: 2, unit: 'cloves', name: 'garlic' },
                { quantity: 1, unit: 'tbsp', name: 'salt' },
                { quantity: 1, unit: 'tbsp', name: 'pepper' },
                { quantity: 1/2, unit: 'tsp', name: 'dried thyme' },
                { quantity: 1/8, unit: 'tsp', name: 'red pepper flakes' },
                { quantity: 48, unit: 'oz', name: 'chicken broth' },
                { quantity: 1/2, unit: 'cup', name: 'rice' },
                { quantity: 11/2, unit: 'cup', name: 'shredded cooked chicken' }
            ],
            directions: [
                { text: 'Preheat oven to 350', checkpoint: 0 },
                { text: 'In a large bowl, whisk together sugars, salt, & butter until a pasta has formed with no lumps', checkpoint: 60 },
                { text: 'Whisk in egg & vanilla, beating until light ribbons fall off the whisk', checkpoint: 300},
                { text: 'Sift in flour & baking soda, then fold mixture with a spatula', checkpoint: 420 },
                { text: 'Fold in chocolate chunks evenly', checkpoint: 540 },
                { text: 'Chill dough for at least 30 minutes', checkpoint: 660 },
                { text: 'Scoop the dough onto a pan, leaving at least 4 inches of space between cookies', checkpoint: 780 },
                { text: 'Bake for 12-15 minutes', checkpoint: 900 },
                 { text: 'Let cool & enjoy!', checkpoint: 1080 }
            ],
            timer: {
                duration: 40,
                unit: 'minutes',
            },
            servingSize: {
                servings: 8,
                ingredients: 11,
                nutrition: {
                    calories: 205, 
                    carbs: 14, 
                    protein: 23, 
                    fat: 7, 
                }
            }
        },
        "re003" : {
            title: 'BBQ Onion Burgers',
            username: 'Test',
            rating: '★ ★ ★ ★',
            src: require('../assets/recipes/bbqBurgers.jpg'),
            ingredients: [
                { quantity: 2, unit: 'cloves', name: 'garlic' },
                { quantity: 1, unit: 'whole', name: 'yellow onion' },
                { quantity: 12, unit: 'oz', name: 'carrots' },
                { quantity: 8, unit: 'oz', name: 'ground beef' },
                { quantity: 1, unit: 'cup', name: 'shredded pepper jack' },
                { quantity: 3, unit: 'tbsp', name: 'bbq sauce' },
                { quantity: 1/2, unit: 'tsp', name: 'dried thyme' },
                { quantity: 2, unit: 'units', name: 'potato buns' },
                { quantity: 2, unit: 'tbsp', name: 'sugar' }
            ],
            directions: [
                { text: 'Preheat oven to 425 degrees', checkpoint: 0 },
                { text: 'Halve, peel, and thinly slice onion. Finely chop garlic until you have 1 tsp. Trim, peel, and cut carrots into long thin sticks.', checkpoint: 60 },
                { text: 'Toss carrots on baking sheet with large drizzle of olive oil, salt, and pepper. Roast until browned and crispy.', checkpoint: 300},
                { text: 'Heat a drizzle of oil in large pan and add onion, seasoned with salt and pepper. Cook until lightly browned and softened, and add 1 tsp of sugar and 2 TBSP of water. Cook until onion is carmelized and jammy. Stir in BBQ sauce and set aside.', checkpoint: 420 },
                { text: 'Form ground beef into two 1/2 inch thick patties. Divide cheese between the centers of each patty. Season all over with salt and pepper', checkpoint: 540 },
                { text: 'Heat a drizzle of oil in the same pan. Add patties and cook until browned and cooked through, 4-5 minutes per side.', checkpoint: 660 },
                { text: 'While patties cool, heat up garlic and 1 TBSP butter in the microwave. Halve the buns, brush the inside with garlic butter. Place on baking sheet and toast in oven until golden, 3-5 mins.', checkpoint: 780 },
                { text: 'Fill toasted buns with patties and BBQ onion. Divide carrot fries between plates.', checkpoint: 900 },
                 { text: 'Let cool & enjoy!', checkpoint: 1080 }
            ],
            timer: {
                duration: 35,
                unit: 'minutes',
            },
            servingSize: {
                servings: 2,
                ingredients: 9,
                nutrition: {
                    calories: 820, 
                    carbs: 78, 
                    protein: 36, 
                    fat: 50, 
                }
            }
        },
    }     
};
