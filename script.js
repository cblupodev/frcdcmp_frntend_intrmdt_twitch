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
    
    // user names selected from the freecodecamp assignment and randomly
    $scope.names = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", "ogamingsc2", "sheevergaming", "cretetion", "c9sneaky", "domingo", "starladder5", "amazhs", "mlg", "mccool12345678", "skuart_tv", "dimmerhook", "girlsluvlps"];

    var asyncCollect = function() {

        $scope.names.forEach(function(val, idx) {

            var current = {
                valFromArray: val,
                isStreaming: false,
                streamName: '',
                logo: '',
                displayName: ''
            }

            // get the stream name data
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
            
            // get logo and display name information
            $http.jsonp('https://api.twitch.tv/kraken/channels/{0}?callback=JSON_CALLBACK'.lp_format(val))
                .success(function(data) {
                    current.logo = data.logo;
                    current.displayName = data.display_name;
                    current.url = "https://www.twitch.tv/" + data.display_name;
                    if (current.logo !== null) {
                        $scope.twitchInfo.push(current);
                    }
                })
                .error(function(err) {
                    l(err);
                })

        });
    }(); // execute immediatley
}]);