export const testuserInfo = {
    "username": "Test",
    "password": "Test1@",
    "email": "Test1@testing.com",
    "userAvatar": "../assets/cooksonas/pancakes.png",
    "userID": "user001",
    "userIngredients": {
        "fruits": [
            {
                "itemId": "in001F",
                "src" : require('../assets/ingredients/apple.png'),
                "title": "Apple",
                "nutrition": {
                    "calories": 95,
                    "fats": 0,
                    "carbs": 25,
                    "protein": 1
                }
            },
            {
                "itemId": "in002F",
                "src" : require('../assets/ingredients/orange.png'),
                "title": "Orange",
                "nutrition": {
                    "calories": 85,
                    "fats": 0,
                    "carbs": 30,
                    "protein": 1
                }
            }
        ],
        "vegetables": [
            {
                "itemID": "in001V",
                "src" : require('../assets/ingredients/lettuce.png'),
                "title": "Lettuce",
                "nutrition": {
                    "calories": 10,
                    "fats": 0.5,
                    "carbs": 2,
                    "protein": 1
                
                }
            }
        ],
        "dairyEggs" : [
            {
                "itemID": "in001DE",
                "src" : require('../assets/ingredients/milk.png'),
                "title": "Whole Milk",
                "nutrition": {
                    "calories": 149,
                    "fats": 8,
                    "carbs": 12,
                    "protein": 8
                }
            }
        ],
        "pastaGrains" : [
            {
                "itemID": "in00PG",
                "src" : require('../assets/ingredients/whiteRice.png'),
                "title": "White Rice",
                "nutrition": {
                    "calories": 206,
                    "fats": 0.4,
                    "carbs": 45,
                    "protein": 4.3
                }
            }
        ],
        "bread" : [
            {
                "itemID": "in001BR",
                "src" : require('../assets/ingredients/wholeWheat.png'),
                "title": "Whole Wheat Bread",
                "nutrition": {
                    "calories": 10,
                    "fats": 1.1,
                    "carbs": 12.9,
                    "protein": 2.7
                }
            }
        ],
        "condiments" : [
            {
                "itemID": "in001C",
                "src" : require('../assets/ingredients/soySauce.png'),
                "title": "Soy Sauce",
                "nutrition": {
                    "calories": 8.5,
                    "fats": 0.1,
                    "carbs": 0.8,
                    "protein": 1.3
                }
            }
        ],
        "baking" : [
            {
                "itemID": "in001BA",
                "src" : require('../assets/ingredients/sugar.png'),
                "title": "Sugar",
                "nutrition": {
                    "calories": 49,
                    "fats": 0,
                    "carbs": 13,
                    "protein": 0
                }
            }
        ],
        "oilsDressing" : [
            {
                "itemID": "in001OD",
                "src" : require('../assets/ingredients/ranch.png'),
                "title": "Ranch",
                "nutrition": {
                    "calories": 120,
                    "fats": 15,
                    "carbs": 2,
                    "protein": 0.3
                }
            }
        ],
        "spicesSeasonings" : [
            {
                "itemID": "in001S",
                "src" : require('../assets/ingredients/salt.png'),
                "title": "Salt",
                "nutrition": {
                    "calories": 0,
                    "fats": 0,
                    "carbs": 0,
                    "protein": 0
                }
            }
        ],
        "meatsProteins" : [
            {
                "itemID": "in001M",
                "src" : require('../assets/ingredients/chicken.png'),
                "title": "Chicken",
                "nutrition": {
                    "calories": 165,
                    "fats": 3.5,
                    "carbs": 0,
                    "protein": 31
                }  
            }
        ],
        "alcoholBevs" : [
            {
                "itemID": "in001AB",
                "src" : require('../assets/ingredients/lemonade.png'),
                "title": "Lemonade",
                "nutrition": {
                    "calories": 120,
                    "fats": 0.5,
                    "carbs": 30,
                    "protein": 0.5
                }
            }
        ],
    },
    "usermadeRecipes": [
      {
        "recipeID": "re002",
        "typeID": "lh001",
        "userID": "../assets/recipeImages/",
        "title": "Dummy Recipe",
        "image": "dummy_image_url",
        "recipeDirections": ["Step 1", "Step 2", "Step 3"],
        "recipeIngredients": ["Ingredient 1", "Ingredient 2"],
        "nutrition": {
          "calories": 200,
          "fats": 8,
          "carbs": 30,
          "protein": 10
        },
        "recipeDescription": {
          "time": "30 minutes",
          "servingSize": "4 servings",
          "description": "This is a dummy recipe."
        }
      }
    ],
    "savedUserRecipes": [
      {
        "recipeID": "re001",
        "userID": "user002"
      }
    ],
    "userAchievements": [
      {
          "achievementID": "",
          "title": "",
          "description": "",
          "trigger": false,
      }
    ]
  }

