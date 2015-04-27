# Ionic Starter App
# angular.module is a global place for creating, registering and retrieving Angular modules
# 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
# the 2nd parameter is an array of 'requires'
# 'starter.controllers' is found in controllers.js

angular.module('starter', [
  'ionic'
  'starter.controllers'
  'starter.directive'
  'starter.services'
])

.value("$initConstant",
  'tagNames': ["swift", "scala", "ios", "android"]
  'qiitaApiEndPoint': "https://qiita.com/api/v1"
)

.run(($ionicPlatform, $data, $initConstant) ->
  $ionicPlatform.ready ->

# Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
# for form inputs)
    if window.cordova and window.cordova.plugins.Keyboard
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar true

    # org.apache.cordova.statusbar required
    StatusBar.styleDefault() if window.StatusBar

    setTimeout(() ->
      $initConstant.tagNames.forEach((tag) ->
        apiPath = "/tags/" + tag + "/items"
        res = $data.feedRead($initConstant.qiitaApiEndPoint + apiPath)
        res.success((data) ->
          console.log('tag is: ' + tag)
          window.localStorage.setItem(tag, JSON.stringify(data))
          navigator.splashscreen.hide() if tag is "android"
          return
        ).error((data, status, headers, config) ->
          alert('error! statuscode: ' + status)
          return
        )
        return
      )
      return
    ,5000)
    return
  return
)

.
config ($stateProvider, $urlRouterProvider) ->
  $stateProvider
  .state('tab',
    url: "/tab"
    abstract: true
    templateUrl: "templates/tabs.html"
  )
  .state('tab.swift',
    url: '/swift'
    views:
      'tab-swift':
        templateUrl: 'templates/tab-swift.html'
        controller: 'SwiftController'
  )
  .state('tab.scala',
    url: "/scala"
    views:
      "tab-scala":
        templateUrl: "templates/tab-scala.html"
        controller: "ScalaController"
  )
  .state("tab.ios",
    url: "/ios"
    views:
      "tab-ios":
        templateUrl: "templates/tab-ios.html"
        controller: "iOSController"
  )
  .state("tab.android",
    url: "/android"
    views:
      "tab-android":
        templateUrl: "templates/tab-android.html"
        controller: "AndroidController"
  )

  # if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise '/tab/swift'

  return
