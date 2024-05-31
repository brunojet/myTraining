angular.module('appsModule', [])
  .controller('appsController', function ($scope) {
    $scope.hasDebugLog = ($scope.$log && $scope.$log.debugEnabled());
    $scope.data = appData;
    $scope.data.categories = $scope.data.categories.map(name => ({ name, expanded: false, highlights: false, mostDownloaded: false }));
    $scope.page = { tab: 'highlights', showCategory: false, category: 'Todos', subCategory: null, subCategories: [] };

    $scope.setTab = function (name) {
      $scope.page.tab = name;
      $scope.page.showCategory = ('recommended' === name);
    };

    hasDataInObject = function (object, data) {
      if (Array.isArray(object)) {
        return object.includes(data);
      } else {
        return object === data;
      }
    }

    isSameSubCategory = function (app, subCategory) {
      if (subCategory) {
        return hasDataInObject(app.subCategory, subCategory.name);
      }

      return true;
    }

    classifiedApps = function () {
      var filteredApps = $scope.data.apps.filter(app => app.tags);

      $scope.data.categories.forEach(category => {
        filteredApps.forEach(app => {
          if (hasDataInObject(app.category, category.name)) {
            if (hasDataInObject(app.tags, 'highlights')) {
              category.highlights = true;
            }

            if (hasDataInObject(app.tags, 'mostDownloaded')) {
              category.mostDownloaded = true;
            }
          }
        });
      });
    }


    classifiedApps();

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
      } else if (hasDataInObject(app.category, $scope.page.category.name)) {
        if ($scope.page.subCategory?.name === 'Mais baixados') {
          return hasDataInObject(app.tags, 'mostDownloaded');
        } else {
          return isSameSubCategory(app.category, $scope.page.subCategory);
        }
      } else {
        return false;
      }
    };
  });
