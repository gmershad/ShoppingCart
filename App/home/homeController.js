
var app = angular.module("nitrocart");

app.controller('homeController', ['nitroCartDataService', function (nitroCartDataService) {
    var controller = this;
    controller.isLoading = false;
    controller.countCources = 0;
    controller.searchString = "";
    controller.sortType = "rating";

    controller.init = function () {
        controller.getNitroDealData();
    }

    controller.getNitroDealData = function () {
        controller.isLoading = true;
        nitroCartDataService.getNitroDealData().then(function (data) {
            controller.dealData = data.deals;
            controller.isLoading = false;
            controller.sortData('rating');
        }).catch(function (data) {
            controller.errorMessage = "Oops! Something went wrong.";
            controller.isLoading = false;
        });
    }

    controller.saveLikes = function (votingId) {
        var votingKey = votingId;
        var existingVoting = controller.getLikes(votingId);
        if (existingVoting === 'NaN' || existingVoting === null) {
            existingVoting = 0;
        }

        var vote = parseInt(existingVoting) + 1;
        localStorage.setItem(votingKey, vote);
        controller.getLikes(votingId);
    }

    controller.getLikes = function (votingId) {
        var votingKey = votingId;
        controller.getTotalLikes();
        var voting = localStorage.getItem(votingKey);
        if (voting === 'NaN' || voting === null)
            return 0;

        return voting;
    }

    controller.clearText = function () {
        controller.searchString = "";
    }

    controller.getTotalLikes = function () {
        controller.totalLikes = 0;
        for (var i = 0; i < localStorage.length; i++) {
            controller.totalLikes = controller.totalLikes + parseInt(localStorage.getItem(localStorage.key(i)));
        }
    }

    controller.sortData = function (type) {
        if (type == 'rating') {
            controller.dealData.sort(compareByRating);
        }
        else if (type == 'like') {
        }
    }

    controller.sortByName = function () {
        var likeArray = [];
        for (var i = 0; i < localStorage.length; i++) {
            likeArray.push({ name: localStorage.key(i), likes: parseInt(localStorage.getItem(localStorage.key(i))) });
        }

        return likeArray.sort(compareByLike);
    }

    function compareByLike(a, b) {
        if (a.likes < b.likes)
            return -1;
        if (a.likes > b.likes)
            return 1;
        return 0;
    }

    function compareByRating(a, b) {
        if (a.rating < b.rating)
            return -1;
        if (a.rating > b.rating)
            return 1;
        return 0;
    }

    controller.openLinkDetails = function (linkUrl) {
        var strWindowFeatures = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
        var URL = linkUrl;
        var win = window.open(URL, "_blank", strWindowFeatures);
    }

    controller.getYellowStars = function (num) {
        var numberOfStars = Math.round(num);
        if (numberOfStars > 5)
            numberOfStars = 5;
        var data = new Array(numberOfStars);
        for (var i = 0; i < data.length; i++) {
            data[i] = i;
        }
        return data;
    }

    controller.getRating = function (rating) {
        if (rating > 5)
            return 5;
        else
            return rating;
    }

    controller.getTags = function (tags) {
        var count = 0;
        var tagString = "";
        var length = tags.length;
        for (var val in tags) {
            if (val == 0)
                tagString = tags[val];
            else {
                tagString = tagString + " , " + tags[val];
            }
        }

        return tagString;
    }

    controller.getGreyStars = function (num) {
        var numberOfStars = Math.round(num);
        var restStars = 5 - numberOfStars;
        if (restStars > 0) {
            var data = new Array(restStars);
            for (var i = 0; i < data.length; i++) {
                data[i] = i;
            }
            return data;
        }
    }

    controller.init();
}]);
