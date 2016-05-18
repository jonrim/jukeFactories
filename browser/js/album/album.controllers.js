'use strict';

juke.controller('AlbumCtrl', function ($scope, AlbumFactory, $rootScope, StatsFactory, PlayerFactory) {

  // load our initial data
  AlbumFactory.fetchAll()
  .then(function(albums) {
    $rootScope.albums = albums;
  });
  AlbumFactory.fetchById(0)
  .then(function(album) {
    $rootScope.album = album;
  });

});

juke.controller('AlbumsCtrl', function ($scope, AlbumFactory, $rootScope, StatsFactory) {
  AlbumFactory.fetchAll()
  .then(function(albums) {
    $rootScope.albums = albums;
  });
});