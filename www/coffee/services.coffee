angular.module('starter.services', [])
.factory('$data', ['$http', ($http) ->
    data = {}

    data.feedRead = (url) -> $http.get(url)

    return data

  ])