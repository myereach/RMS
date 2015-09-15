//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
	.controller("AirCooledElectricityGeneratorListController", function($scope,rmsServices){
		console.log("AirCooledElectricityGeneratorListController");
		rmsServices.init('classes/AirCooledElectricityGenerator/cards');
		rmsServices.getAll().then(function(all){
			$scope.airCooledElectricityGenerators = all;
			$scope.displayedCollection = [].concat(all);
		});
		$scope.name = "RMS";
		$scope.$on("updateAirCooledElectricityGenerators", function (event, airCooledElectricityGenerator) {
			$scope.airCooledElectricityGenerators.push(airCooledElectricityGenerator);
		});

		$scope.remove = function(idx){
			bootbox.confirm("確定刪除?", function(result) {
				if (result) {
					rmsServices.delete($scope.airCooledElectricityGenerators[idx]).then(function(){
						$scope.airCooledElectricityGenerators.splice(idx, 1);
					});
				}
			});
		};
	})
	.controller("AirCooledElectricityGeneratorViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/AirCooledElectricityGenerator/cards');
		rmsServices.getById($stateParams.id).then(function(airCooledElectricityGenerator){
			rmsServices.init('classes/Room/cards');
			rmsServices.getById(airCooledElectricityGenerator.IsInRoom).then(function(room){
				airCooledElectricityGenerator.RoomName=room.Name;
			});
			rmsServices.init('lookup_types/Manufacturer/values');
			rmsServices.getById(airCooledElectricityGenerator.Manufacturer).then(function(manufacturer){
				airCooledElectricityGenerator.ManufacturerName=manufacturer.description;
			});
			rmsServices.init('lookup_types/Criticality/values');
			rmsServices.getById(airCooledElectricityGenerator.Criticality).then(function(criticality){
				airCooledElectricityGenerator.CriticalityName=criticality.description;
			});
			rmsServices.init('lookup_types/MaintananceContractor/values');
			rmsServices.getById(airCooledElectricityGenerator.MaintenanceContractor).then(function(maintenanceContractor){
				airCooledElectricityGenerator.MaintenanceContractorName=maintenanceContractor.description;
			});
			rmsServices.init('lookup_types/MaintainPeriod/values');
			rmsServices.getById(airCooledElectricityGenerator.MaintainPeriod).then(function(maintainPeriod){
				airCooledElectricityGenerator.MaintainPeriodName=maintainPeriod.description;
			});
			$scope.airCooledElectricityGenerator = airCooledElectricityGenerator ;
		});
	})
	.controller("AirCooledElectricityGeneratorAddController", function($rootScope, $scope, $location, rmsServices){
		rmsServices.init('classes/AirCooledElectricityGenerator/cards');

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
			var airCooledElectricityGenerator={};
			airCooledElectricityGenerator=$scope.airCooledElectricityGenerator;
			rmsServices.create(airCooledElectricityGenerator,function(id){
				$location.path("/device/airCooledElectricityGeneratorList");
			});
		};
	})
	.controller("AirCooledElectricityGeneratorUpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('classes/AirCooledElectricityGenerator/cards');
		rmsServices.getById($stateParams.id).then(function(airCooledElectricityGenerator){
			$scope.airCooledElectricityGenerator = airCooledElectricityGenerator;
			console.log(airCooledElectricityGenerator);
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
			rmsServices.init('classes/AirCooledElectricityGenerator/cards');
			rmsServices.update($scope.airCooledElectricityGenerator).then(function(){
				$location.path("/device/airCooledElectricityGeneratorList");
			});

			//});

		};

	});