//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
    .controller("CoolingTowerListController", function($scope,rmsServices){
        console.log("CoolingTowerListController");
		rmsServices.init('classes/CoolingTower/cards');
		rmsServices.getAll().then(function(all){
			$scope.CoolingTowers = all;
			$scope.displayedCollection = [].concat(all);
		});
    	$scope.name = "RMS";
		$scope.$on("updateCoolingTowers", function (event, CoolingTower) {
    		$scope.CoolingTowers.push(CoolingTower);
        });

    	 $scope.remove = function(idx){
			 bootbox.confirm("確定刪除?", function(result) {
				 if (result) {
					 rmsServices.delete($scope.CoolingTowers[idx]).then(function(){
						 $scope.CoolingTowers.splice(idx, 1);
					 });
				 }
			 });
         };
    })
    .controller("CoolingTowerViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/CoolingTower/cards');
		rmsServices.getById($stateParams.id).then(function(CoolingTower){
			rmsServices.init('classes/Room/cards');
			rmsServices.getById(CoolingTower.IsInRoom).then(function(room){
				CoolingTower.RoomName=room.Name;
			});
			rmsServices.init('lookup_types/Manufacturer/values');
			rmsServices.getById(CoolingTower.Manufacturer).then(function(manufacturer){
				CoolingTower.ManufacturerName=manufacturer.description;			
			});
			rmsServices.init('lookup_types/Criticality/values');
			rmsServices.getById(CoolingTower.Criticality).then(function(criticality){
				CoolingTower.CriticalityName=criticality.description;			
			});
			rmsServices.init('lookup_types/MaintananceContractor/values');
			rmsServices.getById(CoolingTower.MaintenanceContractor).then(function(maintenanceContractor){
				CoolingTower.MaintenanceContractorName=maintenanceContractor.description;			
			});
			rmsServices.init('lookup_types/MaintainPeriod/values');
			rmsServices.getById(CoolingTower.MaintainPeriod).then(function(maintainPeriod){
				CoolingTower.MaintainPeriodName=maintainPeriod.description;			
			});
      $scope.CoolingTower = CoolingTower ;
		});
    })
    .controller("CoolingTowerAddController", function($rootScope, $scope, $location, rmsServices){
		var Rooms = rmsServices.init('classes/Room/cards');
		var CoolingTowers = rmsServices.init('classes/CoolingTower/cards');
		$scope.func = "add";
    	$scope.add = function(){
    		var CoolingTower={};
			CoolingTower=$scope.CoolingTower;
			rmsServices.create(CoolingTower,function(id){
				$location.path("/device/CoolingTowerList");
    		});
    	};
    })
    .controller("CoolingTowerUpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('classes/CoolingTower/cards');
		rmsServices.getById($stateParams.id).then(function(CoolingTower){
			$scope.CoolingTower = CoolingTower;
			console.log(CoolingTower);
		}) ;
		rmsServices.init('classes/Room/cards');
		rmsServices.getAll().then(function(all){
			$scope.rooms=all;
		});
		rmsServices.init('lookup_types/Manufacturer/values');
		rmsServices.getAll().then(function(all){
			$scope.manufacturers=all;
		});
		rmsServices.init('lookup_types/Criticality/values');
		rmsServices.getAll().then(function(all){
			$scope.criticalities=all;
		});
		rmsServices.init('lookup_types/MaintananceContractor/values');
		rmsServices.getAll().then(function(all){
			$scope.maintenanceContractors=all;
		});
		rmsServices.init('lookup_types/MaintainPeriod/values');
		rmsServices.getAll().then(function(all){
			$scope.maintainPeriods=all;
		});

			$scope.update = function(){
				//console.log(JSON.stringify($scope.floor.myBuilding));
				//rmsServices.init('domains/BuildingFloor/relations');
				//rmsServices.getAll().then(function(buildingFloorRelations){
					rmsServices.init('classes/CoolingTower/cards');
					rmsServices.update($scope.CoolingTower).then(function(){
						$location.path("/device/CoolingTowerList");
					});

				//});

			};

    });