angular.module('PrettyPrintTrello').controller('PreviewController', function PreviewController($scope, googleExtensionApiService) {
  "use strict";

  var labelsToColorMap = {
    "green": "#34b27d",
    "yellow": "#dbdb57",
    "orange": "#e09952",
    "red": "#cb4d4d",
    "purple": "#93c",
    "blue": "#4d77cb"
  };

  function init() {
    $scope.$emit('tpp:action', { label: "Print'em All", 'event': 'tpp:print'});
  }

  function print(event, data) {
    googleExtensionApiService.print(angular.element('#tpp-print-frame').html());
  }

  function getCardColorByLabel(item) {
    var firstLabelColor = item.labels.length ? item.labels[0].color : 'yellow';
    return labelsToColorMap[firstLabelColor];
  }

  function getStoryStyle(item) {
    var color = $scope.cardColor ? $scope.cardColor : getCardColorByLabel(item);

    return {
      border: '10px solid ' + color
    }
  }

  $scope.init = init;
  $scope.getStoryStyle = getStoryStyle;

  $scope.$on('tpp:print', print);
});

