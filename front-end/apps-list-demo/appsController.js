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
          "subCategory": ["Puzzle"],
          "desenvolvedor": "King",
          "mostDownloaded": true
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
          "subCategory": ["Simulação"],
          "desenvolvedor": "Mojang",
          "mostDownloaded": true
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
          "category": ["Produtividade"],
          "desenvolvedor": "Evernote Corporation",
          "mostDownloaded": true
        },
        {
          "name": "LinkedIn",
          "category": ["Redes Sociais", "Produtividade"],
          "desenvolvedor": "LinkedIn, Inc."
        }
      ]
    };

    //Adjust data
    $scope.data.categories = $scope.data.categories.map(name => ({ name, expanded: false, mostDownloaded: false }));
    $scope.page = { category: 'Todos', subCategory: null, subCategories: [] };

    isSameCategory = function (app, category) {
      if (Array.isArray(app.category)) {
        return app.category.includes(category.name);
      } else {
        return app.category === category.name;
      }
    }

    isSameSubCategory = function (app, subCategory) {
      if (subCategory) {
        if (Array.isArray(app.subCategory)) {
          return app.subCategory.includes(subCategory.name);
        } else {
          return app.subCategory === subCategory.name;
        }
      }

      return true;
    }

    mostDownloadedApps = function () {
      var filteredApps = $scope.data.apps.filter(app => app.mostDownloaded);

      $scope.data.categories.forEach(category => {
        filteredApps.forEach(app => {
          if (isSameCategory(app, category)) {
            category.mostDownloaded = true;
          }
        });
      });
    }


    mostDownloadedApps();

    $scope.toggleCategory = function (category) {
      $scope.page.category.expanded = false;
      $scope.page.subCategories = [];
      $scope.page.subCategory = null;

      if (category.name !== 'Todos') {
        $scope.page.subCategories = $scope.data.subCategories.filter(sub => sub.category === category.name);

        if (category.mostDownloaded) {
          $scope.page.subCategories.unshift({ name: 'Mais baixados' });
        }
      }

      $scope.page.category = category;
      $scope.page.category.expanded = ($scope.page.subCategories.length > 0);

      if ($scope.hasDebugLog) {
        console.debug(`category=${JSON.stringify(category)}`);
        if (category.expanded) {
          console.debug(`subCategories=${JSON.stringify($scope.page.subCategories)}`);
        }
      }
    };

    $scope.filterBySubCategory = function (subCategory) {
      $scope.page.subCategory = subCategory;
    };

    $scope.filterApps = function (app) {
      if ($scope.page.category.name === 'Todos') {
        return true;
      } else if (isSameCategory(app, $scope.page.category)) {
        if ($scope.page.subCategory?.name === 'Mais baixados') {
          return app.mostDownloaded;
        } else {
          return isSameSubCategory(app, $scope.page.subCategory);
        }
      } else {
        return false;
      }
    };
  });