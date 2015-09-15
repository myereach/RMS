//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
	.controller("NaturalCirculationWaterCoolingPumpListController", function($scope,rmsServices){
		console.log("NaturalCirculationWaterCoolingPumpListController");
		rmsServices.init('classes/NaturalCirculationWaterCoolingPump/cards');
		rmsServices.getAll().then(function(all){
			$scope.naturalCirculationWaterCoolingPumps = all;
			$scope.displayedCollection = [].concat(all);
		});
		$scope.name = "RMS";
		$scope.$on("updateNaturalCirculationWaterCoolingPumps", function (event, naturalCirculationWaterCoolingPump) {
			$scope.naturalCirculationWaterCoolingPumps.push(naturalCirculationWaterCoolingPump);
		});

		$scope.remove = function(idx){
			bootbox.confirm("確定刪除?", function(result) {
				if (result) {
					rmsServices.delete($scope.naturalCirculationWaterCoolingPumps[idx]).then(function(){
						$scope.naturalCirculationWaterCoolingPumps.splice(idx, 1);
					});
				}
			});
		};
	})
	.controller("NaturalCirculationWaterCoolingPumpViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/NaturalCirculationWaterCoolingPump/cards');
		rmsServices.getById($stateParams.id).then(function(naturalCirculationWaterCoolingPump){
			rmsServices.init('classes/Room/cards');
			rmsServices.getById(naturalCirculationWaterCoolingPump.IsInRoom).then(function(room){
				naturalCirculationWaterCoolingPump.RoomName=room.Name;
			});
			rmsServices.init('lookup_types/Manufacturer/values');
			rmsServices.getById(naturalCirculationWaterCoolingPump.Manufacturer).then(function(manufacturer){
				naturalCirculationWaterCoolingPump.ManufacturerName=manufacturer.description;
			});
			rmsServices.init('lookup_types/Criticality/values');
			rmsServices.getById(naturalCirculationWaterCoolingPump.Criticality).then(function(criticality){
				naturalCirculationWaterCoolingPump.CriticalityName=criticality.description;
			});
			rmsServices.init('lookup_types/MaintananceContractor/values');
			rmsServices.getById(naturalCirculationWaterCoolingPump.MaintenanceContractor).then(function(maintenanceContractor){
				naturalCirculationWaterCoolingPump.MaintenanceContractorName=maintenanceContractor.description;
			});
			rmsServices.init('lookup_types/MaintainPeriod/values');
			rmsServices.getById(naturalCirculationWaterCoolingPump.MaintainPeriod).then(function(maintainPeriod){
				naturalCirculationWaterCoolingPump.MaintainPeriodName=maintainPeriod.description;
			});
			$scope.naturalCirculationWaterCoolingPump = naturalCirculationWaterCoolingPump ;
		});
	})
	.controller("NaturalCirculationWaterCoolingPumpAddController", function($rootScope, $scope, $location, rmsServices){
		rmsServices.init('classes/NaturalCirculationWaterCoolingPump/cards');

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
			var naturalCirculationWaterCoolingPump={};
			naturalCirculationWaterCoolingPump=$scope.naturalCirculationWaterCoolingPump;
			rmsServices.create(naturalCirculationWaterCoolingPump,function(id){
				$location.path("/device/naturalCirculationWaterCoolingPumpList");
			});
		};
	})
	.controller("NaturalCirculationWaterCoolingPumpUpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('classes/NaturalCirculationWaterCoolingPump/cards');
		rmsServices.getById($stateParams.id).then(function(naturalCirculationWaterCoolingPump){
			$scope.naturalCirculationWaterCoolingPump = naturalCirculationWaterCoolingPump;
			console.log(naturalCirculationWaterCoolingPump);
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
			rmsServices.init('classes/NaturalCirculationWaterCoolingPump/cards');
			rmsServices.update($scope.naturalCirculationWaterCoolingPump).then(function(){
				$location.path("/device/naturalCirculationWaterCoolingPumpList");
			});

			//});

		};

	});