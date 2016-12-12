var app = angular.module("nitrocart");

app.directive('loading', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            showme: '=',
            showerror: '=',
            errormessage: '='
        },
        templateUrl: 'components/loading.html',
    }
})