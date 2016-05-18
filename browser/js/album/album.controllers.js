'use strict';

juke.controller('AlbumCtrl', function ($scope, AlbumFactory, $rootScope, StatsFactory, PlayerFactory) {

  // load our initial data
  AlbumFactory.fetchAll()
  .then(function(albums) {
    $rootScope.albums = albums;
  });
  $rootScope.$on('viewSwap', function(event, data) {
    $rootScope.currentView = data.name;
  });

});

juke.controller('AlbumsCtrl', function ($scope, AlbumFactory, $rootScope, StatsFactory) {
  $rootScope.showAlbums = false;
  AlbumFactory.fetchAll()
  .then(function(albums) {
    $rootScope.albums = albums;
  });
  $rootScope.$on('viewSwap', function(event, data) {
    $rootScope.currentView = data.name;
  })
  $scope.viewOneAlbum = function(id) {
    AlbumFactory.fetchById(id)
    .then(function(album) {
      $rootScope.album = album;
    });
    $rootScope.$broadcast('viewSwap', {name: 'oneAlbum'});
  };
});