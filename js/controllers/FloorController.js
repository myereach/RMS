//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
    .controller("FloorListController", function($scope,rmsServices){
        console.log("FloorListController");
		rmsServices.init('classes/Floor/cards');
		rmsServices.getAll().then(function(all){
			$scope.floors = all;
			$scope.displayedCollection = [].concat(all);
		});
    	$scope.name = "RMS";
		$scope.$on("updateFloors", function (event, floor) {
    		$scope.floors.push(floor);
        });

    	 $scope.remove = function(idx){
			 bootbox.confirm("確定刪除?", function(result) {
				 if (result) {
					 rmsServices.delete($scope.floors[idx]).then(function(){
						 $scope.floors.splice(idx, 1);
					 });
				 }
			 });
         };
    })
    .controller("FloorViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/Floor/cards');
		rmsServices.getById($stateParams.id).then(function(floor){
			rmsServices.init('classes/Building/cards');
			rmsServices.getById(floor.Building).then(function(building){
				floor.BuildingName=building.Name;
				$scope.floor = floor ;
			});

		});
    })
    .controller("FloorAddController", function($rootScope, $scope, $location, rmsServices){
		rmsServices.init('classes/Building/cards');
		rmsServices.getAll().then(function(all){
			$scope.buildings=all;//console.log(JSON.stringify(all));
		});
		rmsServices.init('classes/Floor/cards');
		$scope.func = "add";
    	$scope.add = function(){
    		var floor=$scope.floor;
			rmsServices.create(floor,function(id){
				$location.path("/location/floorList");
    		});
    	};
    })
    .controller("FloorUpdateController", function($scope, $stateParams, $location, rmsServices){

		$scope.func = "update";
		rmsServices.init('classes/Floor/cards');
		rmsServices.getById($stateParams.id).then(function(floor){
			rmsServices.init('classes/Building/cards');
			rmsServices.getById(floor.Building).then(function(building){
				$scope.floor = floor;
				console.log(floor);
			});
		}) ;
		rmsServices.init('classes/Building/cards');
		rmsServices.getAll().then(function(all){
			$scope.buildings=all;
		});

			$scope.update = function(){
				//console.log(JSON.stringify($scope.floor.myBuilding));
				//rmsServices.init('domains/BuildingFloor/relations');
				//rmsServices.getAll().then(function(buildingFloorRelations){
					rmsServices.init('classes/Floor/cards');
					rmsServices.update($scope.floor).then(function(){
						$location.path("/location/floorList");
					});

				//});

			};

    });