//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
	.controller("HighSensibleHeatDirectEvaporationListController", function($scope,rmsServices){
		console.log("HighSensibleHeatDirectEvaporationListController");
		rmsServices.init('classes/HighSensibleHeatDirectEvaporation/cards');
		rmsServices.getAll().then(function(all){
			$scope.highSensibleHeatDirectEvaporations = all;
			$scope.displayedCollection = [].concat(all);
		});
		$scope.name = "RMS";
		$scope.$on("updateHighSensibleHeatDirectEvaporations", function (event, highSensibleHeatDirectEvaporation) {
			$scope.highSensibleHeatDirectEvaporations.push(highSensibleHeatDirectEvaporation);
		});

		$scope.remove = function(idx){
			bootbox.confirm("確定刪除?", function(result) {
				if (result) {
					rmsServices.delete($scope.highSensibleHeatDirectEvaporations[idx]).then(function(){
						$scope.highSensibleHeatDirectEvaporations.splice(idx, 1);
					});
				}
			});
		};
	})
	.controller("HighSensibleHeatDirectEvaporationViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/HighSensibleHeatDirectEvaporation/cards');
		rmsServices.getById($stateParams.id).then(function(highSensibleHeatDirectEvaporation){
			rmsServices.init('classes/Room/cards');
			rmsServices.getById(highSensibleHeatDirectEvaporation.IsInRoom).then(function(room){
				highSensibleHeatDirectEvaporation.RoomName=room.Name;
			});
			rmsServices.init('lookup_types/Manufacturer/values');
			rmsServices.getById(highSensibleHeatDirectEvaporation.Manufacturer).then(function(manufacturer){
				highSensibleHeatDirectEvaporation.ManufacturerName=manufacturer.description;
			});
			rmsServices.init('lookup_types/Criticality/values');
			rmsServices.getById(highSensibleHeatDirectEvaporation.Criticality).then(function(criticality){
				highSensibleHeatDirectEvaporation.CriticalityName=criticality.description;
			});
			rmsServices.init('lookup_types/MaintananceContractor/values');
			rmsServices.getById(highSensibleHeatDirectEvaporation.MaintenanceContractor).then(function(maintenanceContractor){
				highSensibleHeatDirectEvaporation.MaintenanceContractorName=maintenanceContractor.description;
			});
			rmsServices.init('lookup_types/MaintainPeriod/values');
			rmsServices.getById(highSensibleHeatDirectEvaporation.MaintainPeriod).then(function(maintainPeriod){
				highSensibleHeatDirectEvaporation.MaintainPeriodName=maintainPeriod.description;
			});
			$scope.highSensibleHeatDirectEvaporation = highSensibleHeatDirectEvaporation ;
		});
	})
	.controller("HighSensibleHeatDirectEvaporationAddController", function($rootScope, $scope, $location, rmsServices){
		rmsServices.init('classes/HighSensibleHeatDirectEvaporation/cards');

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
			var highSensibleHeatDirectEvaporation={};
			highSensibleHeatDirectEvaporation=$scope.highSensibleHeatDirectEvaporation;
			rmsServices.create(highSensibleHeatDirectEvaporation,function(id){
				$location.path("/device/highSensibleHeatDirectEvaporationList");
			});
		};
	})
	.controller("HighSensibleHeatDirectEvaporationUpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('classes/HighSensibleHeatDirectEvaporation/cards');
		rmsServices.getById($stateParams.id).then(function(highSensibleHeatDirectEvaporation){
			$scope.highSensibleHeatDirectEvaporation = highSensibleHeatDirectEvaporation;
			console.log(highSensibleHeatDirectEvaporation);
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
			rmsServices.init('classes/HighSensibleHeatDirectEvaporation/cards');
			rmsServices.update($scope.highSensibleHeatDirectEvaporation).then(function(){
				$location.path("/device/highSensibleHeatDirectEvaporationList");
			});

			//});

		};

	});