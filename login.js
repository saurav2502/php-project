var app = angular.module('app', []);

function prepareJson() {
    var data;
    let res = [
        {
            "country_id": "1",
            "country_name": "India"
        },
        {
            "country_id": "2",
            "country_name": "Bangladesh"
        }
    ]
    return data = res;
}

function getStates(countryId) {
    let recordList = [
        {

            "country_id": "1",
            "states": [
                {
                    "state_id": "1",
                    "state_name": "BH"
                },
                {
                    "state_id": "2",
                    "state_name": "UP"
                },
                {
                    "state_id": "3",
                    "state_name": "MH"
                }
            ]
        },
        {
            "country_id": "2",
            "states": [
                {
                    "state_id": "4",
                    "state_name": "PN"
                },
                {
                    "state_id": "5",
                    "state_name": "CH"
                },
                {
                    "state_id": "6",
                    "state_name": "MP"
                }
            ]
        }
    ]

    let statesList;
    angular.forEach(recordList, function (value, key) {
        if (countryId === value.country_id) {
            statesList = value.states;
        }
    });
    return statesList;
}

function getCities(stateId) {
    let recordList = [
        {
            "state_id": "1",
            "cities": [
                {
                    "city_id": "1",
                    "city_name": "Patna"
                },
                {
                    "city_id": "2",
                    "city_name": "Ara"
                },
                {
                    "city_id": "3",
                    "city_name": "Danapur"
                }
            ]
        },
        {
            "state_id": "2",
            "cities": [
                {
                    "city_id": "4",
                    "city_name": "PNBE"
                },
                {
                    "city_id": "5",
                    "city_name": "DNR"
                },
                {
                    "city_id": "6",
                    "city_name": "ARA"
                }
            ]
        }
    ]
    let cityList;
    angular.forEach(recordList, function (value, key) {
        if (stateId === value.state_id) {
            cityList = value.cities
        }
    });
    return cityList;
}

app.controller('vinAppCtrl', function ($scope, $http, $sce) {
    $scope.error = false;
    $scope.nodata = false;
    $scope.data = Array();
    $scope.countryList = prepareJson();
    $scope.stateList = Array();
    $scope.cityList = Array();
    $http.get("data.json").then(function (response) {
        let json = angular.fromJson(response.data.daten);
        for (let keys in json) {
            $scope.data[keys] = json[keys];
        }
    });
    $scope.labels = Array();
    $http.get("labels.json").then(function (response) {
        let json = angular.fromJson(response.data);
        for (let keys in json) {
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
            } else {
                $scope.labels[keys] = json[keys]
            }
        }
    });

    $scope.showCountry = function showCountry() {
        console.log("called for country");
        $http.post("country.php").then(function (response) {
            if (response.data === "") {
                response.data = prepareJson();
            }
            console.log(response.data);
            $scope.country_list = response.data
            console.log($scope.countryList);
        });
    }
    $scope.getStatesByCountry = function (countryId) {
        this.mergePDF()
        console.log("getStatesByCountry :: " + countryId)
        let data = angular.fromJson(getStates(countryId));
        if (data == null) {
            $scope.nodata = true;
        }
        $scope.stateList = data;
        console.log($scope.stateList);
    }
    $scope.getCityByState = function (stateId) {
        console.log("getStatesByCountry :: " + stateId)
        let data = angular.fromJson(getCities(stateId));
        if (data == null) {
            $scope.nodata = true;
        }
        $scope.cityList = data;
        console.log($scope.cityList);
    }

    $scope.modelRangeList = Array();
    $scope.bodyBuilderList = Array();
    $scope.styleList = Array();
    $http.get("conversion.json").then(function (response) {
        let json = angular.fromJson(response.data);
        for (let keys in json) {
            if (keys === "modelRange") {
                $scope.modelRangeList[keys] = json[keys]
            } else if (keys === "bodyBuilderList") {
                $scope.bodyBuilderList[keys] = json[keys]
            } else {
                $scope.styleList[keys] = json[keys]
            }
        }
    })

    $scope.mergePDF = function mergePDF() {
        $http.post("merge.php").then(function (response) {
            if (response.data !== "") {
                window.open(response.data)
            }
            console.log("merge.php: " + response.data);
        });
    }

    $scope.mergerFile = function () {
        var params = {
            pdfFirstFile: "pdf/pdf1.pdf",
            pdfSecondFile: "pdf/pdf2.pdf"
        };
        $.ajax({
            type: "POST",
            url: "practice.php",
            data: {data: params},
            success: function (response) {
                if (response != null) {
                    debugger
                    window.open("pdf/merged.pdf");
                }
            },
            error: function () {
                alert('failure');
            }
        });
    }
})