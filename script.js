// '{0}{1}'.lp_format('asdf', 1 + 2);
if (!String.prototype.format) {
  String.prototype.lp_format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

// shortcut for console.log()
function l (message) {
  console.log(message);
}


var myApp = angular.module('myApp', ['ngMaterial']);
myApp.controller('mainController', ['$scope', '$http', function($scope, $http) {

    $scope.twitchInfo = []; // store info for twitch users
    $scope.names = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", "ogamingsc2", "sheevergaming", "cretetion"];

    // todo try and put this in the html
    $scope.captureType = function(e) {
        $scope.type = e.srcElement.name.toLowerCase();

        // filter based on type
    }

    function asyncCollect() {
        // function updateOfflineAndOnline() {
        //     $scope.twitchInfoOffline = {};
        //     $scope.twitchInfoOnline = {};
        //     for (var key in $scope.twitchInfo) {
        //         if ($scope.twitchInfo[key].isStreaming) {
        //             $scope.twitchInfoOnline[key] = $scope.twitchInfo[key];
        //         }
        //         else {
        //             $scope.twitchInfoOffline[key] = $scope.twitchInfo[key];
        //         }
        //     }
        // }

        $scope.names.forEach(function(val, idx) {

            var current = {
                valFromArray: val,
                isStreaming: false,
                streamName: '',
                logo: '',
                displayName: ''
            }

            $http.jsonp('https://api.twitch.tv/kraken/streams/{0}?callback=JSON_CALLBACK'.lp_format(val))
                .success(function(data) {
                    if (!!data.stream) {
                        current.isStreaming = true;
                        current.streamName = data.stream.game;
                    }
                })
                .error(function(err) {
                    l(`in error ${err}`);
                })
            $http.jsonp('https://api.twitch.tv/kraken/channels/{0}?callback=JSON_CALLBACK'.lp_format(val))
                .success(function(data) {
                    current.logo = data.logo;
                    current.displayName = data.display_name;
                    l(current.logo);
                    if (current.logo !== null) {
                        $scope.twitchInfo.push(current);
                    }
                })
                .error(function(err) {
                    l(err);
                })

            // get streaming info
            // $.ajax({
            //     url: 'https://api.twitch.tv/kraken/streams/{0}'.lp_format(val),
            //     dataType: 'jsonp',
            //     success: function(data) {
            //         if (!! data.stream) {
            //             $.extend($scope.twitchInfo[val], {
            //                 // profilePic: data.stream.preview.small,
            //                 isStreaming: true,
            //                 streamName: data.stream.game
            //             });
            //         }
            //         updateOfflineAndOnline();
            //         $scope.$apply();
            //     }
            // });

            // get logo and display name
            // $.ajax({
            //     url: 'https://api.twitch.tv/kraken/channels/{0}'.lp_format(val),
            //     dataType: 'jsonp',
            //     success: function (data) {
            //         $.extend($scope.twitchInfo[val], {
            //             logo: data.logo,
            //             displayName: data.display_name
            //         });
            //         updateOfflineAndOnline();
            //         $scope.$apply();
            //     }
            // });
        });
    }
    asyncCollect();

    // $scope.names = ["admiral_bahroo", "freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","comster404","brunofin","thomasballinger","noobs2ninjas","beohoff"];
    // $scope.twitchInfo = {};
    // $scope.twitchInfoOnline = {};
    // $scope.twitchInfoOffline = {};
    // $scope.names.forEach(function(val, idx) {
    //     $scope.twitchInfo[val] = {};
    // });

    // create array for the info so ngreapeat can traverse it
    $scope.gettwitchInfo = function(type) {
        l(type);
        if (type === 'all') {
            return $.map($scope.twitchInfo, function(elem, idx) {
                return [elem];
            });
        }
        else if (type === 'online') {
            return $.map($scope.twitchInfoOnline, function(elem, idx) {
                return [elem];
            });
        }
        else if (type === 'offline') {
            return $.map($scope.twitchInfoOffline, function(elem, idx) {
                return [elem];
            });
        }
    }

    // asyncCollect();

    // $('button').on('click', function(e) {
    //     var listName = 'ul[name="{0}"]'.lp_format($(e.target).text().toLowerCase());
    //     if (jQuery(listName).hasClass('hide')) {
    //         $('ul').removeClass('show');
    //         $('ul').addClass('hide');
    //         $(listName).addClass('show');
    //         $(listName).removeClass('hide');
    //     }
    // });
}]);