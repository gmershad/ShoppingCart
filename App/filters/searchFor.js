var app = angular.module("nitrocart");
app.filter('searchFor', function () {
    return function (arr, searchString) {
        if (!searchString) {
            return arr;
        }

        var result = [];
        searchString = searchString.toLowerCase();
        angular.forEach(arr, function (item) {
            for (var val in item.tags) {
                if ((item.tags[val].toLowerCase().indexOf(searchString) !== -1)) {
                    result.push(item);
                }
            }
        });

        return result;
    };
});