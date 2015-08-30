//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
    .controller("RoomListController", function($scope,rmsServices){
        console.log("RoomListController");
		rmsServices.init('classes/Room/cards');
		rmsServices.getAll().then(function(all){
			$scope.rooms = all;
			$scope.displayedCollection = [].concat(all);
		});
    	$scope.name = "RMS";
		$scope.$on("updateRooms", function (event, floor) {
    		$scope.rooms.push(room);
        });

    	 $scope.remove = function(idx){
			 bootbox.confirm("確定刪除?", function(result) {
				 if (result) {
					 rmsServices.delete($scope.rooms[idx]).then(function(){
						 $scope.rooms.splice(idx, 1);
					 });
				 }
			 });
         };
    })
    .controller("RoomViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/Room/cards');
		rmsServices.getById($stateParams.id).then(function(room){
			rmsServices.init('classes/Floor/cards');
			rmsServices.getById(room.Floor).then(function(floor){
				console.log(JSON.stringify(floor));
				room.FloorName=floor.Name;
				$scope.room = room ;
			});

		});
    })
    .controller("RoomAddController", function($rootScope, $scope, $location, rmsServices){
		rmsServices.init('classes/Floor/cards');
		rmsServices.getAll().then(function(all){
			$scope.floors=all;//console.log(JSON.stringify(all));
		});
		rmsServices.init('classes/Room/cards');
		$scope.func = "add";
    	$scope.add = function(){
    		var room=$scope.room;
			rmsServices.create(room,function(id){
				$location.path("/location/roomList");
    		});
    	};
    })
    .controller("RoomUpdateController", function($scope, $stateParams, $location, rmsServices){

		$scope.func = "update";
		rmsServices.init('classes/Room/cards');
		rmsServices.getById($stateParams.id).then(function(room){
			rmsServices.init('classes/Floor/cards');
			//rmsServices.getById(room.Floor).then(function(floor){
				$scope.room = room;
				console.log(room);
			//});
		}) ;
		rmsServices.init('classes/Floor/cards');
		rmsServices.getAll().then(function(all){
			$scope.floors=all;
		});

			$scope.update = function(){
				//console.log(JSON.stringify($scope.floor.myBuilding));
				//rmsServices.init('domains/BuildingFloor/relations');
				//rmsServices.getAll().then(function(buildingFloorRelations){
					rmsServices.init('classes/Room/cards');
					rmsServices.update($scope.room).then(function(){
						$location.path("/location/roomList");
					});

				//});

			};

    });