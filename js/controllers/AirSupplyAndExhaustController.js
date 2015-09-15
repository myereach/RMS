//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
	.controller("AirSupplyAndExhaustListController", function($scope,rmsServices){
		console.log("AirSupplyAndExhaustListController");
		rmsServices.init('classes/AirSupplyAndExhaust/cards');
		rmsServices.getAll().then(function(all){
			$scope.airSupplyAndExhausts = all;
			$scope.displayedCollection = [].concat(all);
		});
		$scope.name = "RMS";
		$scope.$on("updateAirSupplyAndExhausts", function (event, airSupplyAndExhaust) {
			$scope.airSupplyAndExhausts.push(airSupplyAndExhaust);
		});

		$scope.remove = function(idx){
			bootbox.confirm("確定刪除?", function(result) {
				if (result) {
					rmsServices.delete($scope.airSupplyAndExhausts[idx]).then(function(){
						$scope.airSupplyAndExhausts.splice(idx, 1);
					});
				}
			});
		};
	})
	.controller("AirSupplyAndExhaustViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/AirSupplyAndExhaust/cards');
		rmsServices.getById($stateParams.id).then(function(airSupplyAndExhaust){
			rmsServices.init('classes/Room/cards');
			rmsServices.getById(airSupplyAndExhaust.IsInRoom).then(function(room){
				airSupplyAndExhaust.RoomName=room.Name;
			});
			rmsServices.init('lookup_types/Manufacturer/values');
			rmsServices.getById(airSupplyAndExhaust.Manufacturer).then(function(manufacturer){
				airSupplyAndExhaust.ManufacturerName=manufacturer.description;
			});
			rmsServices.init('lookup_types/Criticality/values');
			rmsServices.getById(airSupplyAndExhaust.Criticality).then(function(criticality){
				airSupplyAndExhaust.CriticalityName=criticality.description;
			});
			rmsServices.init('lookup_types/MaintananceContractor/values');
			rmsServices.getById(airSupplyAndExhaust.MaintenanceContractor).then(function(maintenanceContractor){
				airSupplyAndExhaust.MaintenanceContractorName=maintenanceContractor.description;
			});
			rmsServices.init('lookup_types/MaintainPeriod/values');
			rmsServices.getById(airSupplyAndExhaust.MaintainPeriod).then(function(maintainPeriod){
				airSupplyAndExhaust.MaintainPeriodName=maintainPeriod.description;
			});
			$scope.airSupplyAndExhaust = airSupplyAndExhaust ;
		});
	})
	.controller("AirSupplyAndExhaustAddController", function($rootScope, $scope, $location, rmsServices){
		rmsServices.init('classes/AirSupplyAndExhaust/cards');

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

		$scope.func = "add";
		$scope.add = function(){
			var airSupplyAndExhaust={};
			airSupplyAndExhaust=$scope.airSupplyAndExhaust;
			rmsServices.create(airSupplyAndExhaust,function(id){
				$location.path("/device/airSupplyAndExhaustList");
			});
		};
	})
	.controller("AirSupplyAndExhaustUpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('classes/AirSupplyAndExhaust/cards');
		rmsServices.getById($stateParams.id).then(function(airSupplyAndExhaust){
			$scope.airSupplyAndExhaust = airSupplyAndExhaust;
			console.log(airSupplyAndExhaust);
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
			rmsServices.init('classes/AirSupplyAndExhaust/cards');
			rmsServices.update($scope.airSupplyAndExhaust).then(function(){
				$location.path("/device/airSupplyAndExhaustList");
			});

			//});

		};

	});