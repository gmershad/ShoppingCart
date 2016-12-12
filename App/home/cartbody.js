
app.directive("cartbody", function () {
    return {
        restrict: "E",
        templateUrl: "home/cart_body.html",
        controller: "homeController",
        controllerAs: "homeController"
    };
});