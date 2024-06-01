angular.module('appsModule', [])
  .controller('appsController', ['$scope', function ($scope) {
    $scope.hasDebugLog = ($scope.$log && $scope.$log.debugEnabled());
    $scope.data = appData;
    $scope.tabs = tabs;

    $scope.data.categories = $scope.data.categories.map(
      category => ({ ...category, expanded: false, mostDownloaded: false })
    );

    $scope.data.categories.unshift(RECOMMENDED);

    $scope.page = {
      tab: HIGHLIGHTS,
      hasHighlights: false,
      hasRecommended: false,
      category: $scope.data.categories[0],
      subCategory: null,
      subCategories: [],
    };

    /* Local functions begin*/
    var hasDataInObject = function (object, data) {
      if (Array.isArray(object)) {
        return object.includes(data);
      } else {
        return object === data;
      }
    }

    var classifyApps = function () {
      var filteredApps = $scope.data.apps.filter(app => app.tags?.length > 0);

      $scope.data.categories.forEach(category => {
        filteredApps.forEach(app => {
          if (hasDataInObject(app.category, category.id)) {
            if (!$scope.page.hasHighlights) {
              $scope.page.hasHighlights = hasDataInObject(app.tags, HIGHLIGHTS.tag);
            }
            if (!$scope.page.hasRecommended) {
              $scope.page.hasRecommended = hasDataInObject(app.tags, RECOMMENDED.tag);
            }
            if (hasDataInObject(app.tags, SC_MOST_DOWNLOADED.tag)) {
              category.mostDownloaded = true;
            }
          }
        });
      });
    }

    var filterRecomendedTab = function (app) {
      if ($scope.page.category.name === RECOMMENDED.name) {
        return $scope.page.hasRecommended ?
          hasDataInObject(app.tags, RECOMMENDED.tag) : true;
      } else if (hasDataInObject(app.category, $scope.page.category.id)) {
        if ($scope.page.subCategory?.id === SC_MOST_DOWNLOADED.id) {
          return hasDataInObject(app.tags, SC_MOST_DOWNLOADED.tag);
        } else if ($scope.page.subCategory) {
          return hasDataInObject(app.subCategory, $scope.page.subCategory.id);
        } else {
          return true;
        }
      }

      return false;
    }

    var filterHighlightTab = function (app) {
      return $scope.page.hasHighlights ?
        hasDataInObject(app.tags, HIGHLIGHTS.tag) : true;
    }

    classifyApps();

    /* Scoped functions begin */

    $scope.setTab = function (id) {
      if ($scope.page.tab.id !== id) {
        $scope.page.tab = tabs.find(tab => tab.id === id);

        if ($scope.hasDebugLog) {
          console.info(`##### setTab(${$scope.page.tab.name})`)
        }
      }
    };

    $scope.isTabSelected = function (tabId) {
      return $scope.page.tab.id === tabId;
    };

    $scope.toggleCategory = function (category) {
      $scope.page.category.expanded = false;
      $scope.page.subCategories = [];
      $scope.page.subCategory = null;

      if (category.name !== RECOMMENDED.name) {
        $scope.page.subCategories =
          $scope.data.subCategories.filter(sub => sub.category === category.id);

        if (category.mostDownloaded) {
          $scope.page.subCategories.unshift(SC_MOST_DOWNLOADED);
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
      switch ($scope.page.tab.id) {
        case HIGHLIGHTS.id:
          return $scope.data.apps.filter(app => filterHighlightTab(app));
        case RECOMMENDED.id:
          return $scope.data.apps.filter(app => filterRecomendedTab(app));
        default:
          return [];
      }
    };

    /* Scoped functions end */
  }]);