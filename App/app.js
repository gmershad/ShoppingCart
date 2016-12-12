(function () {
    "use strict"
    var app = angular.module("nitrocart", ["ui.router"]);

    app.config(["$stateProvider", "$urlRouterProvider","$locationProvider",
      function ($stateProvider, $urlRouterProvider, $locationProvider) {
          $locationProvider.html5Mode(true); 
          $urlRouterProvider.otherwise("/");
          $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "home/home.html",
                controller: "homeController",
                controllerAs: "homeController",
                authenticationReqired: false
            });
      }
    ]);
}());