(function(){
  'use strict';

  angular
  .module('selfinator', ['ionic'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .factory('Camera', ['$q', function($q) {
    return {
      getPicture: function() {
        var q = $q.defer();

        navigator.camera.getPicture(function(result) {
          // Do any magic you need
          q.resolve(result);
        }, function(err) {
          q.reject(err);
        }, {
          quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          targetWidth: window.innerWidth * .5,
          saveToPhotoAlbum: false
        });

        return q.promise;
      }
    }
  }])
  .factory('$io', function (config){
    return io('http://' + config.server.address + ':' + config.server.port);
  });
})();
