angular.module('starter.controllers', [])

.controller('SwiftController', ($scope, $data) ->
  callAPIUrl = "https://qiita.com/api/v1/tags/swift/items"
  posts = JSON.parse(window.localStorage.getItem("swift"))
  console.log("posts = " + posts)
  $scope.articles = posts

  $scope.showArticle = (index) ->
    article = $scope.articles[index]
    window.open(article.url, "_blank", "location=no")
    return

  $scope.populateList = () ->
    res = $data.feedRead(callAPIUrl)
    res.success((data) ->
      $scope.articles = data
      return
    ).error((data, status, header, config) ->
      alert('error! status code: ' + status)
      return
    ).finally(() ->
      $scope.$broadcast('scroll.refreshComplete')
      return
    )
    return

  return
)

.controller("ScalaController", ($scope, $data) ->
  callAPIUrl = "https://qiita.com/api/v1/tags/scala/items"
  posts = JSON.parse(window.localStorage.getItem("scala"))
  $scope.articles = posts

  $scope.showArticle = (index) ->
    article = $scope.articles[index]
    window.open(article.url, "_blank", "location=no")
    return

  $scope.populateList = () ->
    res = $data.feedRead(callAPIUrl)
    res.success((data) ->
      $scope.articles = data
      return
    ).error((data, status, header, config) ->
      alert('error! status code: ' + status)
      return
    ).finally(() ->
      $scope.$broadcast('scroll.refreshComplete')
      return
    )
    return

  return
)

.controller("iOSController", ($scope, $data) ->
  callAPIUrl = "https://qiita.com/api/v1/tags/ios/items"
  posts = JSON.parse(window.localStorage.getItem("ios"))
  $scope.articles = posts

  $scope.showArticle = (index) ->
    article = $scope.articles[index]
    window.open(article.url, "_blank", "location=no")
    return

  $scope.populateList = () ->
    res = $data.feedRead(callAPIUrl)
    res.success((data) ->
      $scope.articles = data
      return
    ).error((data, status, header, config) ->
      alert('error! status code: ' + status)
      return
    ).finally(() ->
      $scope.$broadcast('scroll.refreshComplete')
      return
    )
    return

  return
)

.controller("AndroidController", ($scope, $data) ->
  callAPIUrl = "https://qiita.com/api/v1/tags/android/items"
  posts = JSON.parse(window.localStorage.getItem("android"))
  $scope.articles = posts

  $scope.showArticle = (index) ->
    article = $scope.articles[index]
    window.open(article.url, "_blank", "location=no")
    return

  $scope.populateList = () ->
    res = $data.feedRead(callAPIUrl)
    res.success((data) ->
      $scope.articles = data
      return
    ).error((data, status, header, config) ->
      alert('error! status code: ' + status)
      return
    ).finally(() ->
      $scope.$broadcast('scroll.refreshComplete')
      return
    )
    return

  return
)
