'use strict';

juke.factory('PlayerFactory', function($rootScope) {
	var currentSong,
			playing = false, songList;

	// initialize audio player (note this kind of DOM stuff is odd for Angular)
  var audio = document.createElement('audio');
  // audio.addEventListener('ended', function () {
  //   this.next();
  //   // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
  //   $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });
  return {
  	start: function(song, list) {
  		if (currentSong !== song)
  			this.pause();
  		currentSong = song;
    	audio.src = song.audioUrl;
    	playing = true;
    	songList = list;
  		audio.load();
  		audio.play();
  	},
  	pause: function() {
  		playing = false;
  		audio.pause();
  	},
  	resume: function() {
  		playing = true;
  		audio.play();
  	},
  	isPlaying: function() {
  		if (playing)
  			return true;
  		return false;
  	},
  	getCurrentSong: function() {
  		if (currentSong) return currentSong;
  		return null;
  	},
  	next: function() {
  		console.log(songList)
  		var newIndex = songList.indexOf(currentSong) + 1;
  		newIndex = newIndex % songList.length;
  		var nextSong = songList[newIndex];
  		currentSong = nextSong;
  		this.start(nextSong, songList);
  	},
  	previous: function() {
  		var newIndex = songList.indexOf(currentSong) - 1;
  		newIndex = (newIndex < 0) ? songList.length - 1 : newIndex;
  		var prevSong = songList[newIndex];
  		currentSong = prevSong;
  		this.start(prevSong, songList);
  	},
  	getProgress: function() {
  		if (!playing) return 0;
  		audio.addEventListener('timeupdate', function () {
		    $rootScope.progress = 100 * audio.currentTime / audio.duration;
		    // $scope.$digest(); // re-computes current template only (this scope)
		    $rootScope.$evalAsync(); // likely best, schedules digest if none happening
		  });
  		return audio.currentTime / audio.duration;
  	}
  }
});
