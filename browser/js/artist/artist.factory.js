juke.factory('ArtistFactory', function($http, $log, AlbumFactory) {
  return {
    fetchAll: function() {
      return $http.get('/api/artists/')
      .then(function (res) { return res.data; })
      .catch($log.error);
    },
    fetchById: function(n) {
      return this.fetchAll()
      .then(function (artists) {
        return $http.get('/api/artists/' + n) // temp: get one
      })
      .then(function (res) { return res.data; })
      .then(function (artist) {
        artist.albums = [];
        
        return artist;
      })
      .catch($log.error); // $log service can be turned on and off; also, pre-bound
    }
  };
});