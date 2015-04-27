angular.module('starter.directive', [])
.directive('tabsSwipable', ['$ionicGesture', ($ionicGesture) ->
    restrict: 'A'
    require: 'ionTabs'
    link: (scope, elm, attrs, tabsCtrl) ->
      onSwipeLeft = () ->
        target = tabsCtrl.selectedIndex() + 1
        if target < tabsCtrl.tabs.length then scope.$apply(tabsCtrl.select(target))
        return

      onSwipeRight = () ->
        target = tabsCtrl.selectedIndex() - 1
        if target >= 0 then scope.$apply(tabsCtrl.select(target))
        return

      swipeGesture = $ionicGesture.on('swipeleft', onSwipeLeft, elm).on('swiperight', onSwipeRight, elm)
      scope.$on('$destroy', () ->
        $ionicGesture.off(swipeGesture, 'swipeleft', onSwipeLeft)
        $ionicGesture.off(swipeGesture, 'swiperight', onSwipeRight)
        return
      )
      return
  ])