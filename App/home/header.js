
app.directive("header", function () {
    return {
        restrict: "E",
        templateUrl: "home/header.html",
        controller: "homeController",
        controllerAs: "homeController"
    };
});