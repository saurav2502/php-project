let app = angular.module('fossApp', []);

app.controller('fossAppCtrl', function($scope, $http, $sce) {
    $scope.labels = Array();
    $http.get("labels.json").then(function (response) {
        var json = angular.fromJson(response.data);
        for (keys in json) {
            if (keys === "formtext") {
                $scope.formtext = $sce.trustAsHtml(json[keys])
            } else if (keys === "submit") {
                $scope.submit = $sce.trustAsHtml(json[keys])
            } else if (keys === "country") {
                $scope.country = $sce.trustAsHtml(json[keys])
            } else if (keys === "state") {
                $scope.state = $sce.trustAsHtml(json[keys])
            } else if (keys === "city") {
                $scope.city = $sce.trustAsHtml(json[keys])
            } else if (keys === "stateError") {
                $scope.stateError = $sce.trustAsHtml(json[keys])
            } else if (keys === "cityError") {
                $scope.cityError = $sce.trustAsHtml(json[keys])
            } else if (keys === "vinNumber") {
                $scope.vinNumber = $sce.trustAsHtml(json[keys])
            } else if (keys === "carType") {
                $scope.carType = $sce.trustAsHtml(json[keys])
            } else if (keys === "carBody") {
                $scope.carBody = $sce.trustAsHtml(json[keys])
            } else if (keys === "carLabel") {
                $scope.carLabel = $sce.trustAsHtml(json[keys])
            } else if (keys === "carType") {
                $scope.carType = $sce.trustAsHtml(json[keys])
            } else {
                $scope.labels[keys] = json[keys]
            }
        }
    });

    $scope.showCarTypes = function () {
        let data = prepareJson()
        console.log("Entered in show car: " + data);
    }
});