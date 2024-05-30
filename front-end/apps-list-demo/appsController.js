angular.module('appsModule', [])
  .controller('appsController', function ($scope) {
    $scope.hasDebugLog = ($scope.$log && $scope.$log.debugEnabled());
    $scope.data = {
      "categories": [
        "Todos",
        "Jogos",
        "Redes Sociais",
        "Produtividade"
      ],
      "subCategories": [
        {
          "name": "Mais baixados",
          "category": "Jogos"
        },
        {
          "name": "Puzzle",
          "category": "Jogos"
        },
        {
          "name": "Aventura",
          "category": "Jogos"
        },
        {
          "name": "Simulação",
          "category": "Jogos"
        }
      ],
      "apps": [
        {
          "name": "Candy Crush",
          "category": "Jogos",
          "subCategory": ["Puzzle", "Mais baixados"],
          "desenvolvedor": "King"
        },
        {
          "name": "Pokémon GO",
          "category": "Jogos",
          "subCategory": "Aventura",
          "desenvolvedor": "Niantic"
        },
        {
          "name": "Minecraft",
          "category": "Jogos",
          "subCategory": ["Simulação", "Mais baixados"],
          "desenvolvedor": "Mojang"
        },
        {
          "name": "Facebook",
          "category": "Redes Sociais",
          "desenvolvedor": "Facebook, Inc."
        },
        {
          "name": "Instagram",
          "category": "Redes Sociais",
          "desenvolvedor": "Facebook, Inc."
        },
        {
          "name": "Twitter",
          "category": "Redes Sociais",
          "desenvolvedor": "Twitter, Inc."
        },
        {
          "name": "Microsoft Office",
          "category": "Produtividade",
          "desenvolvedor": "Microsoft Corporation"
        },
        {
          "name": "Trello",
          "category": "Produtividade",
          "desenvolvedor": "Atlassian"
        },
        {
          "name": "Evernote",
          "category": "Produtividade",
          "desenvolvedor": "Evernote Corporation"
        },
        {
          "name": "LinkedIn",
          "category": ["Redes Sociais", "Produtividade"],
          "desenvolvedor": "LinkedIn, Inc."
        }
      ]
    };

    //Adjust data
    $scope.data.categories = $scope.data.categories.map(name => ({ name, expanded: false }));

    //Variables
    $scope.category = 'Todos';
    $scope.subCategory;
    $scope.subCategories = [];

    $scope.toggleCategory = function (category) {
      $scope.subCategories = category.name !== 'Todos'
        ? $scope.data.subCategories.filter(sub => sub.category === category.name)
        : [];

      category.expanded = ($scope.subCategories.length > 0);
      $scope.category = category.name;
      $scope.subCategory = null;

      if ($scope.hasDebugLog) {
        console.debug(`category=${JSON.stringify(category)}`);
        if (category.expanded) {
          console.debug(`subCategories=${JSON.stringify($scope.subCategories)}`);
        }
      }
    };

    $scope.filterBySubCategory = function (subCategory) {
      $scope.subCategory = subCategory.name;
    };

    $scope.searchCategories = function (app) {
      if (Array.isArray(app.category)) {
        return app.category.includes($scope.category)
      } else {
        return app.category === $scope.category
      }
    }

    $scope.searchSubCategories = function (app) {
      if ($scope.subCategory) {
        if (Array.isArray(app.subCategory)) {
          return (app.subCategory.includes($scope.subCategory))
        } else {
          return (app.subCategory === $scope.subCategory)
        }
      }

      return true;
    }

    $scope.filterApps = function (app) {
      if ($scope.category !== 'Todos') {
        return $scope.searchCategories(app) && $scope.searchSubCategories(app);
      }

      return true;
    };
  });