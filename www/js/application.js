angular.module('starter', ['ionic', 'starter.controllers', 'starter.directive', 'starter.services']).value("$initConstant", {
    'tagNames': ["swift", "scala", "ios", "android"],
    'qiitaApiEndPoint': "https://qiita.com/api/v1"
}).run(function($ionicPlatform, $data, $initConstant) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        setTimeout(function() {
            $initConstant.tagNames.forEach(function(tag) {
                var apiPath, res;
                apiPath = "/tags/" + tag + "/items";
                res = $data.feedRead($initConstant.qiitaApiEndPoint + apiPath);
                res.success(function(data) {
                    console.log('tag is: ' + tag);
                    window.localStorage.setItem(tag, JSON.stringify(data));
                    if (tag === "android") {
                        navigator.splashscreen.hide();
                    }
                }).error(function(data, status, headers, config) {
                    alert('error! statuscode: ' + status);
                });
            });
        }, 5000);
    });
}).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    }).state('tab.swift', {
        url: '/swift',
        views: {
            'tab-swift': {
                templateUrl: 'templates/tab-swift.html',
                controller: 'SwiftController'
            }
        }
    }).state('tab.scala', {
        url: "/scala",
        views: {
            "tab-scala": {
                templateUrl: "templates/tab-scala.html",
                controller: "ScalaController"
            }
        }
    }).state("tab.ios", {
        url: "/ios",
        views: {
            "tab-ios": {
                templateUrl: "templates/tab-ios.html",
                controller: "iOSController"
            }
        }
    }).state("tab.android", {
        url: "/android",
        views: {
            "tab-android": {
                templateUrl: "templates/tab-android.html",
                controller: "AndroidController"
            }
        }
    });
    $urlRouterProvider.otherwise('/tab/swift');
});

angular.module('starter.controllers', []).controller('SwiftController', function($scope, $data) {
    var callAPIUrl, posts;
    callAPIUrl = "https://qiita.com/api/v1/tags/swift/items";
    posts = JSON.parse(window.localStorage.getItem("swift"));
    console.log("posts = " + posts);
    $scope.articles = posts;
    $scope.showArticle = function(index) {
        var article;
        article = $scope.articles[index];
        window.open(article.url, "_blank", "location=no");
    };
    $scope.populateList = function() {
        var res;
        res = $data.feedRead(callAPIUrl);
        res.success(function(data) {
            $scope.articles = data;
        }).error(function(data, status, header, config) {
            alert('error! status code: ' + status);
        })["finally"](function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
}).controller("ScalaController", function($scope, $data) {
    var callAPIUrl, posts;
    callAPIUrl = "https://qiita.com/api/v1/tags/scala/items";
    posts = JSON.parse(window.localStorage.getItem("scala"));
    $scope.articles = posts;
    $scope.showArticle = function(index) {
        var article;
        article = $scope.articles[index];
        window.open(article.url, "_blank", "location=no");
    };
    $scope.populateList = function() {
        var res;
        res = $data.feedRead(callAPIUrl);
        res.success(function(data) {
            $scope.articles = data;
        }).error(function(data, status, header, config) {
            alert('error! status code: ' + status);
        })["finally"](function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
}).controller("iOSController", function($scope, $data) {
    var callAPIUrl, posts;
    callAPIUrl = "https://qiita.com/api/v1/tags/ios/items";
    posts = JSON.parse(window.localStorage.getItem("ios"));
    $scope.articles = posts;
    $scope.showArticle = function(index) {
        var article;
        article = $scope.articles[index];
        window.open(article.url, "_blank", "location=no");
    };
    $scope.populateList = function() {
        var res;
        res = $data.feedRead(callAPIUrl);
        res.success(function(data) {
            $scope.articles = data;
        }).error(function(data, status, header, config) {
            alert('error! status code: ' + status);
        })["finally"](function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
}).controller("AndroidController", function($scope, $data) {
    var callAPIUrl, posts;
    callAPIUrl = "https://qiita.com/api/v1/tags/android/items";
    posts = JSON.parse(window.localStorage.getItem("android"));
    $scope.articles = posts;
    $scope.showArticle = function(index) {
        var article;
        article = $scope.articles[index];
        window.open(article.url, "_blank", "location=no");
    };
    $scope.populateList = function() {
        var res;
        res = $data.feedRead(callAPIUrl);
        res.success(function(data) {
            $scope.articles = data;
        }).error(function(data, status, header, config) {
            alert('error! status code: ' + status);
        })["finally"](function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
});

angular.module('starter.directive', []).directive('tabsSwipable', [
    '$ionicGesture', function($ionicGesture) {
        return {
            restrict: 'A',
            require: 'ionTabs',
            link: function(scope, elm, attrs, tabsCtrl) {
                var onSwipeLeft, onSwipeRight, swipeGesture;
                onSwipeLeft = function() {
                    var target;
                    target = tabsCtrl.selectedIndex() + 1;
                    if (target < tabsCtrl.tabs.length) {
                        scope.$apply(tabsCtrl.select(target));
                    }
                };
                onSwipeRight = function() {
                    var target;
                    target = tabsCtrl.selectedIndex() - 1;
                    if (target >= 0) {
                        scope.$apply(tabsCtrl.select(target));
                    }
                };
                swipeGesture = $ionicGesture.on('swipeleft', onSwipeLeft, elm).on('swiperight', onSwipeRight, elm);
                scope.$on('$destroy', function() {
                    $ionicGesture.off(swipeGesture, 'swipeleft', onSwipeLeft);
                    $ionicGesture.off(swipeGesture, 'swiperight', onSwipeRight);
                });
            }
        };
    }
]);

angular.module('starter.services', []).factory('$data', [
    '$http', function($http) {
        var data;
        data = {};
        data.feedRead = function(url) {
            return $http.get(url);
        };
        return data;
    }
]);
