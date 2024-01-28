const recipeDetails = {
    title: 'Chocolate Chip Cookies',
    username: 'username',
    rating: '★ ★ ★ ★',
    imageSource: require('../assets/chocolatechipcookies.png'),
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
      minutes: 15, 
      servings: 24,
      ingredients: 10,
      nutrition: {
        calories: 150, 
        carbs: 20, 
        protein: 2, 
        fat: 7, 
      }
    }
  };

  export default recipeDetails