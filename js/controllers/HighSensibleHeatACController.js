//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
	.controller("HighSensibleHeatACListController", function($scope,rmsServices){
		console.log("HighSensibleHeatACListController");
		rmsServices.init('classes/HighSensibleHeatAC/cards');
		rmsServices.getAll().then(function(all){
			$scope.highSensibleHeatACs = all;
			$scope.displayedCollection = [].concat(all);
		});
		$scope.name = "RMS";
		$scope.$on("updateHighSensibleHeatACs", function (event, highSensibleHeatAC) {
			$scope.highSensibleHeatACs.push(highSensibleHeatAC);
		});

		$scope.remove = function(idx){
			bootbox.confirm("確定刪除?", function(result) {
				if (result) {
					rmsServices.delete($scope.highSensibleHeatACs[idx]).then(function(){
						$scope.highSensibleHeatACs.splice(idx, 1);
					});
				}
			});
		};
	})
	.controller("HighSensibleHeatACViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/HighSensibleHeatAC/cards');
		rmsServices.getById($stateParams.id).then(function(highSensibleHeatAC){
			rmsServices.init('classes/Room/cards');
			rmsServices.getById(highSensibleHeatAC.IsInRoom).then(function(room){
				highSensibleHeatAC.RoomName=room.Name;
			});
			rmsServices.init('lookup_types/Manufacturer/values');
			rmsServices.getById(highSensibleHeatAC.Manufacturer).then(function(manufacturer){
				highSensibleHeatAC.ManufacturerName=manufacturer.description;
			});
			rmsServices.init('lookup_types/Criticality/values');
			rmsServices.getById(highSensibleHeatAC.Criticality).then(function(criticality){
				highSensibleHeatAC.CriticalityName=criticality.description;
			});
			rmsServices.init('lookup_types/MaintananceContractor/values');
			rmsServices.getById(highSensibleHeatAC.MaintenanceContractor).then(function(maintenanceContractor){
				highSensibleHeatAC.MaintenanceContractorName=maintenanceContractor.description;
			});
			rmsServices.init('lookup_types/MaintainPeriod/values');
			rmsServices.getById(highSensibleHeatAC.MaintainPeriod).then(function(maintainPeriod){
				highSensibleHeatAC.MaintainPeriodName=maintainPeriod.description;
			});
			$scope.highSensibleHeatAC = highSensibleHeatAC ;
		});
	})
	.controller("HighSensibleHeatACAddController", function($rootScope, $scope, $location, rmsServices){
		rmsServices.init('classes/HighSensibleHeatAC/cards');

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
			var highSensibleHeatAC={};
			highSensibleHeatAC=$scope.highSensibleHeatAC;
			rmsServices.create(highSensibleHeatAC,function(id){
				$location.path("/device/highSensibleHeatACList");
			});
		};
	})
	.controller("HighSensibleHeatACUpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('classes/HighSensibleHeatAC/cards');
		rmsServices.getById($stateParams.id).then(function(highSensibleHeatAC){
			$scope.highSensibleHeatAC = highSensibleHeatAC;
			console.log(highSensibleHeatAC);
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
			rmsServices.init('classes/HighSensibleHeatAC/cards');
			rmsServices.update($scope.highSensibleHeatAC).then(function(){
				$location.path("/device/highSensibleHeatACList");
			});

			//});

		};

	});