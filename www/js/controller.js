(function(){
  'use strict';

  angular
    .module('selfinator')
    .controller('CameraCtrl', function (Camera, $ionicPopup, $io) {
      var self = this;

      self.pictures = [];

      self.getPhoto = function() {
        Camera.getPicture().then(function (image) {
          self.pictures.push({src: 'data:image/jpg;base64,' +  image, selected: false});
        }, function (err) {
          console.err(err);
        });
      }

      self.sendPhotos = function(){
        var counter = 0;
        for (var i = 0; i < self.pictures.length; i++) {
          if(self.pictures[i].selected){
            counter++;
            $io.emit('new-selfie', self.pictures[i].src);
          }
        }
        var alertPopup = $ionicPopup.alert({
             title: 'Success',
             template: counter + ' photos have been sent !'
           });
      }
    })
})();