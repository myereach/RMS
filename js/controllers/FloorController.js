//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
    .controller("FloorListController", function($scope,rmsServices){
        console.log("FloorListController");
		rmsServices.init('classes/Floor/cards');
		rmsServices.getAll().then(function(all){
			$scope.floors = all;
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
		var Buildings = rmsServices.init('classes/Building/cards');
		var Floors = rmsServices.init('classes/Floor/cards');
		$scope.func = "add";
    	$scope.add = function(){
    		var floor={};//= new Floor();
			floor=$scope.floor;
			Floors.create(floor,function(id){
				$location.path("/location/floorList");
    		});
    	};
    })
    .controller("FloorUpdateController", function($scope, $stateParams, $location, rmsServices){
		rmsServices.init('classes/Building/cards');
		var Buildings =rmsServices;
		rmsServices.init('classes/Floor/cards');
		var Floors = rmsServices;
		rmsServices.init('domains/BuildingFloor/relations');
		var BuildingFloorRelations = rmsServices;

		$scope.func = "update";
		console.log(Buildings.itemUrl);

		console.log(Floors.itemUrl);
		//console.log(Buildings.itemUrl);
		console.log(BuildingFloorRelations.itemUrl);
		Floors.getById($stateParams.id).then(function(floor){
			Buildings.getById(floor.Building).then(function(building){
				$scope.floor = floor;
			});
		}) ;
		Buildings.getAll().then(function(all){
			$scope.buildings=all;
		});

			$scope.update = function(){
				//console.log(JSON.stringify($scope.floor.myBuilding));
				BuildingFloorRelations.getAll().then(function(buildingFloorRelations){
					for (i = 0; i < buildingFloorRelations.length; i++) {
						console.log(buildingFloorRelations[i]._destinationId+"=="+$scope.floor._id);
						if(buildingFloorRelations[i]._destinationId==$scope.floor._id){
							console.log("get it"+JSON.stringify(buildingFloorRelations[i]));
							buildingFloorRelations[i]._sourceId=$scope.floor.newBuilding;
							//BuildingFloorRelations.update(buildingFloorRelations[i]).then(function(){

									Floors.update($scope.floor).then(function(){
										$location.path("/location/floorList");
									});
						}
					}
				});

			};

    });