'use strict';

juke.controller('ArtistCtrl', function ($scope, $rootScope, ArtistFactory) {
	$rootScope.$on('viewSwap', function(event, data) {
    $rootScope.currentView = data.name;
    if (data.name === "allArtists") {
			ArtistFactory.fetchAll()
			.then(function(artists) {
				console.log(artists)
				$rootScope.artists = artists;
			});
		}
	});
	$scope.viewOneArtist = function(id) {
    ArtistFactory.fetchById(id)
    .then(function(artist) {
			$rootScope.currentArtist = artist;
			console.log($rootScope.currentArtist)
			console.log(artist)
    });
    $rootScope.$broadcast('viewSwap', {name: 'oneArtist'});
  };
});