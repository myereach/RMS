//'use strict';
//console.log("BuildingController");['$scope', '$http', function($scope, $http){
angular.module("rmsApp.controllers")
//MetronicApp
    .controller("BuildingListController", function($scope,rmsServices){
		rmsServices.init('classes/Building/cards');
		rmsServices.getAll().then(function(all){
			$scope.buildings = all;
		});
    	$scope.name = "rmsApp";
		$scope.$on("updateBuildings", function (event, building) {
    		$scope.buildings.push(building);
        });

    	 $scope.remove = function(idx){
			 bootbox.confirm("確定刪除?", function(result) {
				 if (result) {
					 rmsServices.delete($scope.buildings[idx]).then(function(){
						 $scope.buildings.splice(idx, 1);
					 });
				 }
			 });
         };
    })
    .controller("BuildingViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/Building/cards');
		rmsServices.getById($stateParams.id).then(function(building){
			$scope.building = building ;
		});
    })
    .controller("BuildingAddController", function($rootScope, $scope, $location, rmsServices){
		rmsServices.init('classes/Building/cards');
    	$scope.func = "add";
    	$scope.add = function(){
    		var building={};//= new Building();
			building=$scope.building;
			rmsServices.create(building,function(){
				$location.path("/location/buildingList");
    		});

    	};
    })
    .controller("BuildingUpdateController", function($scope, $stateParams, $location, rmsServices){
		rmsServices.init('classes/Building/cards');
    	$scope.func = "update";
		rmsServices.getById($stateParams.id).then(function(building){
			$scope.building = building ;
		});

		$scope.update = function(){
			rmsServices.update($scope.building).then(function(){
				$location.path("/location/buildingList");
			});
		};

    });