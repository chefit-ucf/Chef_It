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
                { quantity: 1, unit: '', name: 'egg' },
                { quantity: 1, unit: 'tsp', name: 'vanilla extract' },
                { quantity: 1.25, unit: 'cup', name: 'all-purpose flour' },
                { quantity: 1/2, unit: 'tsp', name: 'baking soda' },
                { quantity: 4, unit: 'oz', name: 'semi-sweet chips' },
                { quantity: 4, unit: 'oz', name: 'dark chocolate chunks' }
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
        "re004" : {
            title: 'Strawberry Shortcake',
            username: 'user05',
            rating: '★ ★ ★ ★ ★',
            src: require('../assets/recipes/strawberryShortcake.jpg'),
            ingredients: [
                { quantity: 2, unit: 'pints', name: 'strawberries' },
                { quantity: 1/2, unit: 'cup', name: 'sugar' },
                { quantity: 4, unit: 'cups', name: 'flour' },
                { quantity: 3, unit: 'tbsp', name: 'sugar' },
                { quantity: 1/4, unit: 'tsp', name: 'salt' },
                { quantity: 5, unit: 'tsp', name: 'baking powder' },
                { quantity: 11/4, unit: 'cups', name: 'butter' },
                { quantity: 3, unit: 'cups', name: 'whipping cream' },
                { quantity: 1/4, unit: 'tsp', name: 'vanilla extract' }
            ],
            directions: [
                { text: 'Cut strawberries in half and crush about 1/4 of the berries with a fork. Mix remaining berries with 1/2 cup of sugar. Set aside, covered, for about 30 mins to develop flavor.', checkpoint: 0 },
                { text: 'Preheat oven to 450 degrees.', checkpoint: 60 },
                { text: 'In a large mixing bowl, sift together flour, 3 tbsp sugar, salt, and baking soda. Add softened butter, cream, and mix to a soft dough. Knead dough for one minute, then roll it out to about 1/2 inch thickness. Using a biscuit cutter, cut an even number of rounds.', checkpoint: 300},
                { text: 'Use a little of butter to grease baking sheet. Place the rounds on it and brush the remaining butter on top. Bake for 10-15 minutes, or until golden brown.', checkpoint: 420 },
                { text: 'Remove from the oven and pull the shortcakes apart. Brush the inside with some of the remaining melted butter.', checkpoint: 540 },
                { text: 'Whisk the whipping cream in a bowl until it thickens. Add vanilla extract and mix again.', checkpoint: 660 },
                { text: 'Place a bottom half of a shortcake with a generous spoonful of cream and berries. Cover with a top half, add a few more berries if necessary and top with whipped cream.', checkpoint: 780 },
                { text: 'Fill toasted buns with patties and BBQ onion. Divide carrot fries between plates.', checkpoint: 900 },
                 { text: 'Serve immediately & enjoy!', checkpoint: 1080 }
            ],
            timer: {
                duration: 45,
                unit: 'minutes',
            },
            servingSize: {
                servings: 4,
                ingredients: 9,
                nutrition: {
                    calories: 1681, 
                    carbs: 150, 
                    protein: 19, 
                    fat: 115, 
                }
            }
        },
        "re005" : {
            title: 'Lasagna',
            username: 'Test',
            rating: '★ ★ ★ ★ ★',
            src: require('../assets/recipes/lasagna.jpg'),
            ingredients: [
                { quantity: 12, unit: '', name: 'uncooked lasagna noodles' },
                { quantity: 4, unit: 'cups', name: 'shredded mozzarella cheese' },
                { quantity: 1/2, unit: 'cup', name: 'parmesan cheese' },
                { quantity: 1/2, unit: 'lb', name: 'lean ground beef' },
                { quantity: 1/2, unit: 'lb', name: 'italian sausage' },
                { quantity: 1, unit: 'diced', name: 'onion' },
                { quantity: 2, unit: 'cloves', name: 'minced garlic' },
                { quantity: 36, unit: 'oz', name: 'pasta sauce' },
                { quantity: 2, unit: 'tbsp', name: 'tomato paste' },
                { quantity: 1, unit: 'tsp', name: 'italian seasoning' },
                { quantity: 2, unit: 'cups', name: 'ricotta cheese' },
                { quantity: 1/4, unit: 'cup', name: 'fresh parsley' },
                { quantity: 1, unit: 'beaten', name: 'egg' }
            ],
            directions: [
                { text: 'Preheat oven to 350 degrees. In a large pot of salted water, boil lasagna noodles until al dente. Drain, rinse, under cold water, and set aside.', checkpoint: 0 },
                { text: 'In a large skillet, cook beef, sausage, onion, and garlic over medium-high heat until no pink remains. Drain any fat.', checkpoint: 60 },
                { text: 'Stir in pasta sauce, tomato paste, italian seasoning, salt, and pepper. Simmer over medium heat for 5 minutes.', checkpoint: 300},
                { text: 'In a seperate bowl, combine 1 1/2 mozzarella, 1/4 parmesan cheese, ricotta, parsley, egg, and 1/4 salt.', checkpoint: 420 },
                { text: 'Spread 1 cup of meat sauce in a 9x13 pan or casserole dish. Top it with 3 lasagna noodles, ricotta cheese mixture, and another cup of meat sauce. Repeat twice. Finish with 3 noodles topped with remaining sauce.', checkpoint: 540 },
                { text: 'Cover with foil and bake for 45 minutes.', checkpoint: 660 },
                { text: 'Remove the foil and sprinkle with the remaining mozzerlla cheese and parmesan cheese. Bake for another 15 minutes or until browned.', checkpoint: 780 },
                { text: 'Rest for at least 15 minutes before cutting.', checkpoint: 900 },
                 { text: 'Let cool & enjoy!', checkpoint: 1080 }
            ],
            timer: {
                duration: 2,
                unit: 'hours',
            },
            servingSize: {
                servings: 12,
                ingredients: 13,
                nutrition: {
                    calories: 377, 
                    carbs: 26, 
                    protein: 29, 
                    fat: 16, 
                }
            }
        },
        "re006" : {
            title: 'French Bread Pizza',
            username: 'User8263',
            rating: '★ ★ ★ ★ ★',
            src: require('../assets/food/frenchBreadPizza.png'),
            ingredients: [
                { quantity: 12, unit: '', name: 'uncooked lasagna noodles' },
                { quantity: 4, unit: 'cups', name: 'shredded mozzarella cheese' },
                { quantity: 1/2, unit: 'cup', name: 'parmesan cheese' },
                { quantity: 1/2, unit: 'lb', name: 'lean ground beef' },
                { quantity: 1/2, unit: 'lb', name: 'italian sausage' },
                { quantity: 1, unit: 'diced', name: 'onion' },
                { quantity: 2, unit: 'cloves', name: 'minced garlic' },
                { quantity: 36, unit: 'oz', name: 'pasta sauce' },
                { quantity: 2, unit: 'tbsp', name: 'tomato paste' },
                { quantity: 1, unit: 'tsp', name: 'italian seasoning' },
                { quantity: 2, unit: 'cups', name: 'ricotta cheese' },
                { quantity: 1/4, unit: 'cup', name: 'fresh parsley' },
                { quantity: 1, unit: 'beaten', name: 'egg' }
            ],
            directions: [
                { text: 'Preheat oven to 350 degrees. In a large pot of salted water, boil lasagna noodles until al dente. Drain, rinse, under cold water, and set aside.', checkpoint: 0 },
                { text: 'In a large skillet, cook beef, sausage, onion, and garlic over medium-high heat until no pink remains. Drain any fat.', checkpoint: 60 },
                { text: 'Stir in pasta sauce, tomato paste, italian seasoning, salt, and pepper. Simmer over medium heat for 5 minutes.', checkpoint: 300},
                { text: 'In a seperate bowl, combine 1 1/2 mozzarella, 1/4 parmesan cheese, ricotta, parsley, egg, and 1/4 salt.', checkpoint: 420 },
                { text: 'Spread 1 cup of meat sauce in a 9x13 pan or casserole dish. Top it with 3 lasagna noodles, ricotta cheese mixture, and another cup of meat sauce. Repeat twice. Finish with 3 noodles topped with remaining sauce.', checkpoint: 540 },
                { text: 'Cover with foil and bake for 45 minutes.', checkpoint: 660 },
                { text: 'Remove the foil and sprinkle with the remaining mozzerlla cheese and parmesan cheese. Bake for another 15 minutes or until browned.', checkpoint: 780 },
                { text: 'Rest for at least 15 minutes before cutting.', checkpoint: 900 },
                 { text: 'Let cool & enjoy!', checkpoint: 1080 }
            ],
            timer: {
                duration: 30,
                unit: 'mins',
            },
            servingSize: {
                servings: 12,
                ingredients: 13,
                nutrition: {
                    calories: 377, 
                    carbs: 26, 
                    protein: 29, 
                    fat: 16, 
                }
            }
        },
        "re007" : {
            title: 'Chicken Tostadas',
            username: 'User0281',
            rating: '★ ★ ★ ★ ★',
            src: require('../assets/food/chickenTostadas.png'),
            ingredients: [
                { quantity: 12, unit: '', name: 'uncooked lasagna noodles' },
                { quantity: 4, unit: 'cups', name: 'shredded mozzarella cheese' },
                { quantity: 1/2, unit: 'cup', name: 'parmesan cheese' },
                { quantity: 1/2, unit: 'lb', name: 'lean ground beef' },
                { quantity: 1/2, unit: 'lb', name: 'italian sausage' },
                { quantity: 1, unit: 'diced', name: 'onion' },
                { quantity: 2, unit: 'cloves', name: 'minced garlic' },
                { quantity: 36, unit: 'oz', name: 'pasta sauce' },
                { quantity: 2, unit: 'tbsp', name: 'tomato paste' },
                { quantity: 1, unit: 'tsp', name: 'italian seasoning' },
                { quantity: 2, unit: 'cups', name: 'ricotta cheese' },
                { quantity: 1/4, unit: 'cup', name: 'fresh parsley' },
                { quantity: 1, unit: 'beaten', name: 'egg' }
            ],
            directions: [
                { text: 'Preheat oven to 350 degrees. In a large pot of salted water, boil lasagna noodles until al dente. Drain, rinse, under cold water, and set aside.', checkpoint: 0 },
                { text: 'In a large skillet, cook beef, sausage, onion, and garlic over medium-high heat until no pink remains. Drain any fat.', checkpoint: 60 },
                { text: 'Stir in pasta sauce, tomato paste, italian seasoning, salt, and pepper. Simmer over medium heat for 5 minutes.', checkpoint: 300},
                { text: 'In a seperate bowl, combine 1 1/2 mozzarella, 1/4 parmesan cheese, ricotta, parsley, egg, and 1/4 salt.', checkpoint: 420 },
                { text: 'Spread 1 cup of meat sauce in a 9x13 pan or casserole dish. Top it with 3 lasagna noodles, ricotta cheese mixture, and another cup of meat sauce. Repeat twice. Finish with 3 noodles topped with remaining sauce.', checkpoint: 540 },
                { text: 'Cover with foil and bake for 45 minutes.', checkpoint: 660 },
                { text: 'Remove the foil and sprinkle with the remaining mozzerlla cheese and parmesan cheese. Bake for another 15 minutes or until browned.', checkpoint: 780 },
                { text: 'Rest for at least 15 minutes before cutting.', checkpoint: 900 },
                 { text: 'Let cool & enjoy!', checkpoint: 1080 }
            ],
            timer: {
                duration: 25,
                unit: 'mins',
            },
            servingSize: {
                servings: 12,
                ingredients: 13,
                nutrition: {
                    calories: 377, 
                    carbs: 26, 
                    protein: 29, 
                    fat: 16, 
                }
            }
        },
        "re008" : {
            title: 'Raspberry Shortbread Cookies',
            username: 'User2034',
            rating: '★ ★ ★ ★ ★',
            src: require('../assets/food/raspberryShortbreadCookies.png'),
            ingredients: [
                { quantity: 12, unit: '', name: 'uncooked lasagna noodles' },
                { quantity: 4, unit: 'cups', name: 'shredded mozzarella cheese' },
                { quantity: 1/2, unit: 'cup', name: 'parmesan cheese' },
                { quantity: 1/2, unit: 'lb', name: 'lean ground beef' },
                { quantity: 1/2, unit: 'lb', name: 'italian sausage' },
                { quantity: 1, unit: 'diced', name: 'onion' },
                { quantity: 2, unit: 'cloves', name: 'minced garlic' },
                { quantity: 36, unit: 'oz', name: 'pasta sauce' },
                { quantity: 2, unit: 'tbsp', name: 'tomato paste' },
                { quantity: 1, unit: 'tsp', name: 'italian seasoning' },
                { quantity: 2, unit: 'cups', name: 'ricotta cheese' },
                { quantity: 1/4, unit: 'cup', name: 'fresh parsley' },
                { quantity: 1, unit: 'beaten', name: 'egg' }
            ],
            directions: [
                { text: 'Preheat oven to 350 degrees. In a large pot of salted water, boil lasagna noodles until al dente. Drain, rinse, under cold water, and set aside.', checkpoint: 0 },
                { text: 'In a large skillet, cook beef, sausage, onion, and garlic over medium-high heat until no pink remains. Drain any fat.', checkpoint: 60 },
                { text: 'Stir in pasta sauce, tomato paste, italian seasoning, salt, and pepper. Simmer over medium heat for 5 minutes.', checkpoint: 300},
                { text: 'In a seperate bowl, combine 1 1/2 mozzarella, 1/4 parmesan cheese, ricotta, parsley, egg, and 1/4 salt.', checkpoint: 420 },
                { text: 'Spread 1 cup of meat sauce in a 9x13 pan or casserole dish. Top it with 3 lasagna noodles, ricotta cheese mixture, and another cup of meat sauce. Repeat twice. Finish with 3 noodles topped with remaining sauce.', checkpoint: 540 },
                { text: 'Cover with foil and bake for 45 minutes.', checkpoint: 660 },
                { text: 'Remove the foil and sprinkle with the remaining mozzerlla cheese and parmesan cheese. Bake for another 15 minutes or until browned.', checkpoint: 780 },
                { text: 'Rest for at least 15 minutes before cutting.', checkpoint: 900 },
                 { text: 'Let cool & enjoy!', checkpoint: 1080 }
            ],
            timer: {
                duration: 55,
                unit: 'mins',
            },
            servingSize: {
                servings: 12,
                ingredients: 13,
                nutrition: {
                    calories: 377, 
                    carbs: 26, 
                    protein: 29, 
                    fat: 16, 
                }
            }
        },
    }     
};
