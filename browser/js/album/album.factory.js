juke.factory('StatsFactory', function ($q) {
  var statsObj = {};
  statsObj.totalTime = function (album) {
    var audio = document.createElement('audio');
    return $q(function (resolve, reject) {
      var sum = 0;
      var n = 0;
      function resolveOrRecur () {
        if (n >= album.songs.length) resolve(sum);
        else audio.src = album.songs[n++].audioUrl;
      }
      audio.addEventListener('loadedmetadata', function () {
        sum += audio.duration;
        resolveOrRecur();
      });
      resolveOrRecur();
    });
  };
  return statsObj;
});

juke.factory('AlbumFactory', function($http, $log, StatsFactory) {
  function populateAlbum(album) {  
    album.imageUrl = '/api/albums/' + album.id + '/image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song.id + '/audio';
      song.albumIndex = i;
    });
    StatsFactory.totalTime(album)
    .then(function(totalTime) {
      album.totalTime = totalTime;
    });
  }
  return {
    fetchAll: function() {
      return $http.get('/api/albums/')
      .then(function (res) { return res.data; })
      .then(function (albums) {
        albums.forEach((album) => {
          album.imageUrl = '/api/albums/' + album.id + '/image';
        });
        return albums;
      })
      .catch($log.error);
    },
    fetchById: function(n) {
      return this.fetchAll()
      .then(function (albums) {
        return $http.get('/api/albums/' + albums[n].id) // temp: get one
      })
      .then(function (res) { return res.data; })
      .then(function (album) {
        populateAlbum(album);
        return album;
      })
      .catch($log.error); // $log service can be turned on and off; also, pre-bound
    }
  };
});