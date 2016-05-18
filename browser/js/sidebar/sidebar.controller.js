'use strict';

juke.controller('SideBarCtrl', function ($scope, $rootScope) {
	$scope.viewAlbums = function() {
		$rootScope.$broadcast('viewSwap', { name: 'allAlbums'});
	};
	$scope.viewAllArtists = function() {
		$rootScope.$broadcast('viewSwap', { name: 'allArtists'});
	};
});