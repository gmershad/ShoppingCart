var app = angular.module("nitrocart");

app.factory('nitroCartDataService', ['$http', '$q', function ($http, $q) {

    function getNitroDealData() {
        var endPoint = "https://hackerearth.0x10.info/api/nitro_deals?type=json&query=list_deals";
        var req = {
            method: 'GET',
            url: endPoint
        }

        var deferred = $q.defer();
        $http(req).success(function (data) {
            deferred.resolve(data);
        })
          .error(function (err) {
              console.log('Error retrieving data');
              deferred.reject(err);
          });
        return deferred.promise;
    }

    return {
        getNitroDealData: getNitroDealData,
    };
}]);