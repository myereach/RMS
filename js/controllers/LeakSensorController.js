//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
	.controller("LeakSensorListController", function($scope,rmsServices){
		console.log("LeakSensorListController");
		rmsServices.init('classes/LeakSensor/cards');
		rmsServices.getAll().then(function(all){
			$scope.leakSensors = all;
			$scope.displayedCollection = [].concat(all);
		});
		$scope.name = "RMS";
		$scope.$on("updateLeakSensors", function (event, leakSensor) {
			$scope.leakSensors.push(leakSensor);
		});

		$scope.remove = function(idx){
			bootbox.confirm("確定刪除?", function(result) {
				if (result) {
					rmsServices.delete($scope.leakSensors[idx]).then(function(){
						$scope.leakSensors.splice(idx, 1);
					});
				}
			});
		};
	})
	.controller("LeakSensorViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/LeakSensor/cards');
		rmsServices.getById($stateParams.id).then(function(leakSensor){
			rmsServices.init('classes/Room/cards');
			rmsServices.getById(leakSensor.IsInRoom).then(function(room){
				leakSensor.RoomName=room.Name;
			});
			rmsServices.init('lookup_types/Manufacturer/values');
			rmsServices.getById(leakSensor.Manufacturer).then(function(manufacturer){
				leakSensor.ManufacturerName=manufacturer.description;
			});
			rmsServices.init('lookup_types/Criticality/values');
			rmsServices.getById(leakSensor.Criticality).then(function(criticality){
				leakSensor.CriticalityName=criticality.description;
			});
			rmsServices.init('lookup_types/MaintananceContractor/values');
			rmsServices.getById(leakSensor.MaintenanceContractor).then(function(maintenanceContractor){
				leakSensor.MaintenanceContractorName=maintenanceContractor.description;
			});
			rmsServices.init('lookup_types/MaintainPeriod/values');
			rmsServices.getById(leakSensor.MaintainPeriod).then(function(maintainPeriod){
				leakSensor.MaintainPeriodName=maintainPeriod.description;
			});
			$scope.leakSensor = leakSensor ;
		});
	})
	.controller("LeakSensorAddController", function($rootScope, $scope, $location, rmsServices){
		rmsServices.init('classes/LeakSensor/cards');

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
			var leakSensor={};
			leakSensor=$scope.leakSensor;
			rmsServices.create(leakSensor,function(id){
				$location.path("/device/leakSensorList");
			});
		};
	})
	.controller("LeakSensorUpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('classes/LeakSensor/cards');
		rmsServices.getById($stateParams.id).then(function(leakSensor){
			$scope.leakSensor = leakSensor;
			console.log(leakSensor);
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
			rmsServices.init('classes/LeakSensor/cards');
			rmsServices.update($scope.leakSensor).then(function(){
				$location.path("/device/leakSensorList");
			});

			//});

		};

	});