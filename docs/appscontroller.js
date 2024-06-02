angular.module('appsModule', [])
  .controller('appsController', ['$scope', function ($scope) {
    $scope.hasDebugLog = ($scope.$log && $scope.$log.debugEnabled());
    $scope.data = appData;
    $scope.tabs = tabs;

    $scope.data.categories = $scope.data.categories.map(
      category => ({ ...category, expanded: false, hasSubCategory: false, mostDownloaded: false })
    );

    $scope.page = {
      tab: HIGHLIGHTS,
      hasHighlights: false,
      hasRecommended: false,
      category: $scope.data.categories[0],
      subCategory: null,
      subCategories: []
    };

    /* Local functions begin*/
    const hasDataInObject = function (object, data) {
      if (Array.isArray(object)) {
        return object.includes(data);
      } else {
        return object === data;
      }
    }

    const scValidate = function (category, app, scOtherId) {
      var hasSubCategory = (app.subCategory?.length > 0);

      if (hasSubCategory) {
        category.hasSubCategory = true;
      } else {
        app.subCategory = scOtherId;
      }

      return hasSubCategory;
    }

    const setScOther = function (category, scOtherId) {
      var scOther = JSON.parse(SC_OTHER_TEMPLATE);
      scOther.id = scOtherId++;
      scOther.category = category.id;
      $scope.data.subCategories.push(scOther);
    }

    const classifyApps = function () {
      var filteredApps = $scope.data.apps.filter(app => app.tags?.length > 0);
      var lastScOtherId = SC_OTHER_ID;

      $scope.data.categories.forEach(category => {
        var hasSubCategory = false;

        filteredApps.forEach(app => {
          if (hasDataInObject(app.category, category.id)) {
            hasSubCategory |= scValidate(category, app, lastScOtherId);

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

        if (!hasSubCategory) {
          setScOther(category, lastScOtherId++);
        }
      });

      $scope.data.categories.unshift(C_RECOMMENDED);
    }

    const filterRecomendedTab = function (app) {
      if ($scope.page.category.name === RECOMMENDED.name) {
        return $scope.page.hasRecommended ?
          hasDataInObject(app.tags, RECOMMENDED.tag) : true;
      } else if (hasDataInObject(app.category, $scope.page.category.id)) {
        if ($scope.page.category.hasSubCategory) {
          if ($scope.page.subCategory) {
            return hasDataInObject(app.subCategory, $scope.page.subCategory.id);
          } else if ($scope.page.category.hasSubCategory && $scope.page.category.mostDownloaded) {
            return hasDataInObject(app.tags, SC_MOST_DOWNLOADED.tag);
          }
        }
        return true;
      }

      return false;
    }

    const filterHighlightTab = function (app) {
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
      if (!$scope.page.category.expanded) {
        if (category.name !== RECOMMENDED.name) {
          $scope.page.subCategories =
            $scope.data.subCategories.filter(sub => sub.category === category.id);
        }

        $scope.page.category = category;
        $scope.page.category.expanded = ($scope.page.subCategories.length > 0);

        if ($scope.hasDebugLog) {
          console.debug(`category=${JSON.stringify(category)}`);
          if (category.expanded) {
            console.debug(`subCategories=${JSON.stringify($scope.page.subCategories)}`);
          }
        }
      } else {
        $scope.page.subCategories = [];
        $scope.page.subCategory = null;
        $scope.page.category.expanded = false;
      }
    };

    $scope.filterBySubCategory = function (subCategory) {
      $scope.page.subCategory = subCategory;
    };

    $scope.filterApps = function (app) {
      var apps = [];

      switch ($scope.page.tab.id) {
        case HIGHLIGHTS.id:
          apps = $scope.data.apps.filter(app => filterHighlightTab(app));
          break;
        case RECOMMENDED.id:
          apps = $scope.data.apps.filter(app => filterRecomendedTab(app));
          break;
        default:
          break;
      }

      return apps;
    };

    /* Scoped functions end */
  }]);