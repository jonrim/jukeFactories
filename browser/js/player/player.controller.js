'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {
  // outgoing events (to Album… or potentially other characters)
  $scope.next = function () { 
    PlayerFactory.pause(); 
    PlayerFactory.next();
    $rootScope.currentSong = PlayerFactory.getCurrentSong(); 
    $rootScope.playing = PlayerFactory.isPlaying();
  };
  $scope.prev = function () { 
    PlayerFactory.pause();
    PlayerFactory.previous();
    $rootScope.currentSong = PlayerFactory.getCurrentSong();
    $rootScope.playing = PlayerFactory.isPlaying(); 
  };
    // main toggle
  $rootScope.toggle = function (song) {
    if (PlayerFactory.isPlaying() && 
        (PlayerFactory.getCurrentSong() === song))
      PlayerFactory.pause();
    else {
      if (PlayerFactory.getCurrentSong() !== song) {
        PlayerFactory.start(song, $rootScope.album.songs);
        $rootScope.currentSong = PlayerFactory.getCurrentSong();
        // $rootScope.songList = $scope.album.songs;
      }
      else {
        PlayerFactory.resume();
      }
    }
    $rootScope.playing = PlayerFactory.isPlaying();
    PlayerFactory.getProgress();
  };

});
