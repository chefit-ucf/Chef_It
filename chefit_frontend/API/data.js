
    export const testuserInfo = {
      "username": "Test",
      "password": "Test1@",
      "email": "Test1@testing.com",
      "userAvatar": "../assets/Cooksonas/pancakes.png",
      "userID": "user001",
      "userIngredients": [
        {
          "itemID": "in001LE",
          "type": "Vegetable",
          "image": "../assets/ingredients",
          "title": "Lettuce",
          "nutrition": {
            "calories": 10,
            "fats": 0.5,
            "carbs": 2,
            "protein": 1
          }
        },
        {
            "itemID": "in001LE",
            "type": "Fruit",
            "image": "../assets/ingredients",
            "title": "Apple",
            "nutrition": {
              "calories": 95,
              "fats": 0,
              "carbs": 25,
              "protein": 1
            }
          },
          {
            "itemID": "in001LE",
            "type": "Dairy & Eggs",
            "image": "../assets/ingredients",
            "title": "Whole Milk",
            "nutrition": {
              "calories": 149,
              "fats": 8,
              "carbs": 12,
              "protein": 8
            }
          },
          {
            "itemID": "in001LE",
            "type": "Pasta & Grains",
            "image": "../assets/ingredients",
            "title": "White Rice",
            "nutrition": {
              "calories": 206,
              "fats": 0.4,
              "carbs": 45,
              "protein": 4.3
            }
          },
          {
            "itemID": "in001LE",
            "type": "Bread",
            "image": "../assets/ingredients",
            "title": "Whole Wheat Bread",
            "nutrition": {
              "calories": 10,
              "fats": 1.1,
              "carbs": 12.9,
              "protein": 2.7
            }
          },
          {
            "itemID": "in001LE",
            "type": "Sauce & Condiments",
            "image": "../assets/ingredients",
            "title": "Soy Sauce",
            "nutrition": {
              "calories": 8.5,
              "fats": 0.1,
              "carbs": 0.8,
              "protein": 1.3
            }
          },
          {
            "itemID": "in001LE",
            "type": "Baking",
            "image": "../assets/ingredients",
            "title": "Sugar",
            "nutrition": {
              "calories": 49,
              "fats": 0,
              "carbs": 13,
              "protein": 0
            }
          },
          {
            "itemID": "in001LE",
            "type": "Oils & Dressing",
            "image": "../assets/ingredients",
            "title": "Ranch",
            "nutrition": {
              "calories": 120,
              "fats": 15,
              "carbs": 2,
              "protein": 0.3
            }
          },
          {
            "itemID": "in001LE",
            "type": "Spices & Seasoning",
            "image": "../assets/ingredients",
            "title": "Salt",
            "nutrition": {
              "calories": 0,
              "fats": 0,
              "carbs": 0,
              "protein": 0
            }
          },
          {
            "itemID": "in001LE",
            "type": "Meat & Protein",
            "image": "../assets/ingredients",
            "title": "Chicken",
            "nutrition": {
              "calories": 165,
              "fats": 3.5,
              "carbs": 0,
              "protein": 31
            }
          },
          {
            "itemID": "in001LE",
            "type": "Alcohol & Beverages",
            "image": "../assets/ingredients",
            "title": "Water",
            "nutrition": {
              "calories": 0,
              "fats": 0,
              "carbs": 0,
              "protein": 0
            }
          }
      ],
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
            "achievementID": "achieve001",
            "title": "Recipe Pioneer",
            "UnlockedDescription": "Create your first Recipe!",
            "LockedDescription": "Hint: Try adding a Recipe!",
            "trigger": true,
            "UnlockedImage" : require("../assets/achievementImages/firstrecipe_logo.png"),
            "LockedImage": require("../assets/achievementImages/lockedAchievement.png"),
            "lockedReward": require("../assets/achievementImages/lockedAchievement_image.png"),
            "rewardImage": require("../assets/achievementImages/firstrecipe_rewardImage.png"),
            "timeTriggered": "Placement Time",
        },

        {
            "achievementID": "achieve002",
            "title": "Social Sous-Chef",
            "UnlockedDescription": "Like your first Recipe!",
            "LockedDescription": "Hint: See any Recipes you like? ",
            "trigger": false,
            "UnlockedImage" : "../assets/achievementImages/lockedAchievement",
            "LockedImage": require("../assets/achievementImages/lockedAchievement.png"),
            "rewardImage": undefined,
            "lockedReward": require("../assets/achievementImages/lockedAchievement_image.png"),
            "timeTriggered": "Placement Time",
        },

        {
            "achievementID": "achieve003",
            "title": "Flavorful Facelift",
            "UnlockedDescription": "Change your Cooksona for the first time!",
            "LockedDescription": "Hint: Go check out our Cooksonas!",
            "trigger": false,
            "UnlockedImage" : "../assets/achievementImages/lockedAchievement",
            "LockedImage": require("../assets/achievementImages/lockedAchievement.png"),
            "rewardImage": undefined,
            "lockedReward": require("../assets/achievementImages/lockedAchievement_image.png"),
            "timeTriggered": "Placement Time",
        }

      ]
    }

  