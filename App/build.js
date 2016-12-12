!function(){"use strict";var app=angular.module("nitrocart",["ui.router"]);app.config(["$stateProvider","$urlRouterProvider","$locationProvider",function($stateProvider,$urlRouterProvider,$locationProvider){$locationProvider.html5Mode(!0),$urlRouterProvider.otherwise("/"),$stateProvider.state("home",{url:"/",templateUrl:"home/home.html",controller:"homeController",controllerAs:"homeController",authenticationReqired:!1})}])}();var app=angular.module("nitrocart");app.directive("loading",function(){return{restrict:"E",replace:!0,scope:{showme:"=",showerror:"=",errormessage:"="},templateUrl:"components/loading.html"}});var app=angular.module("nitrocart");app.filter("searchFor",function(){return function(arr,searchString){if(!searchString)return arr;var result=[];return searchString=searchString.toLowerCase(),angular.forEach(arr,function(item){for(var val in item.tags)-1!==item.tags[val].toLowerCase().indexOf(searchString)&&result.push(item)}),result}});var app=angular.module("nitrocart");app.factory("nitroCartDataService",["$http","$q",function($http,$q){function getNitroDealData(){var endPoint="https://hackerearth.0x10.info/api/nitro_deals?type=json&query=list_deals",req={method:"GET",url:endPoint},deferred=$q.defer();return $http(req).success(function(data){deferred.resolve(data)}).error(function(err){console.log("Error retrieving data"),deferred.reject(err)}),deferred.promise}return{getNitroDealData:getNitroDealData}}]);var app=angular.module("nitrocart");app.controller("homeController",["nitroCartDataService",function(nitroCartDataService){function compareByLike(a,b){return a.likes<b.likes?-1:a.likes>b.likes?1:0}function compareByRating(a,b){return a.rating<b.rating?-1:a.rating>b.rating?1:0}var controller=this;controller.isLoading=!1,controller.countCources=0,controller.searchString="",controller.sortType="rating",controller.init=function(){controller.getNitroDealData()},controller.getNitroDealData=function(){controller.isLoading=!0,nitroCartDataService.getNitroDealData().then(function(data){controller.dealData=data.deals,controller.isLoading=!1,controller.sortData("rating")})["catch"](function(data){controller.errorMessage="Oops! Something went wrong.",controller.isLoading=!1})},controller.saveLikes=function(votingId){var votingKey=votingId,existingVoting=controller.getLikes(votingId);("NaN"===existingVoting||null===existingVoting)&&(existingVoting=0);var vote=parseInt(existingVoting)+1;localStorage.setItem(votingKey,vote),controller.getLikes(votingId)},controller.getLikes=function(votingId){var votingKey=votingId;controller.getTotalLikes();var voting=localStorage.getItem(votingKey);return"NaN"===voting||null===voting?0:voting},controller.clearText=function(){controller.searchString=""},controller.getTotalLikes=function(){controller.totalLikes=0;for(var i=0;i<localStorage.length;i++)controller.totalLikes=controller.totalLikes+parseInt(localStorage.getItem(localStorage.key(i)))},controller.sortData=function(type){"rating"==type&&controller.dealData.sort(compareByRating)},controller.sortByName=function(){for(var likeArray=[],i=0;i<localStorage.length;i++)likeArray.push({name:localStorage.key(i),likes:parseInt(localStorage.getItem(localStorage.key(i)))});return likeArray.sort(compareByLike)},controller.openLinkDetails=function(linkUrl){var strWindowFeatures="location=yes,height=570,width=520,scrollbars=yes,status=yes",URL=linkUrl;window.open(URL,"_blank",strWindowFeatures)},controller.getYellowStars=function(num){var numberOfStars=Math.round(num);numberOfStars>5&&(numberOfStars=5);for(var data=new Array(numberOfStars),i=0;i<data.length;i++)data[i]=i;return data},controller.getRating=function(rating){return rating>5?5:rating},controller.getTags=function(tags){var tagString="";tags.length;for(var val in tags)tagString=0==val?tags[val]:tagString+" , "+tags[val];return tagString},controller.getGreyStars=function(num){var numberOfStars=Math.round(num),restStars=5-numberOfStars;if(restStars>0){for(var data=new Array(restStars),i=0;i<data.length;i++)data[i]=i;return data}},controller.init()}]),app.directive("header",function(){return{restrict:"E",templateUrl:"home/header.html",controller:"homeController",controllerAs:"homeController"}}),app.directive("searchsort",function(){return{restrict:"E",templateUrl:"home/search_sort.html",controller:"homeController",controllerAs:"homeController"}}),app.directive("cartbody",function(){return{restrict:"E",templateUrl:"home/cart_body.html",controller:"homeController",controllerAs:"homeController"}});