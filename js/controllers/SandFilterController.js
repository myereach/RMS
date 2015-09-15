//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
	.controller("SandFilterListController", function($scope,rmsServices){
		console.log("SandFilterListController");
		rmsServices.init('classes/SandFilter/cards');
		rmsServices.getAll().then(function(all){
			$scope.sandFilters = all;
			$scope.displayedCollection = [].concat(all);
		});
		$scope.name = "RMS";
		$scope.$on("updateSandFilters", function (event, sandFilter) {
			$scope.sandFilters.push(sandFilter);
		});

		$scope.remove = function(idx){
			bootbox.confirm("確定刪除?", function(result) {
				if (result) {
					rmsServices.delete($scope.sandFilters[idx]).then(function(){
						$scope.sandFilters.splice(idx, 1);
					});
				}
			});
		};
	})
	.controller("SandFilterViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/SandFilter/cards');
		rmsServices.getById($stateParams.id).then(function(sandFilter){
			rmsServices.init('classes/Room/cards');
			rmsServices.getById(sandFilter.IsInRoom).then(function(room){
				sandFilter.RoomName=room.Name;
			});
			rmsServices.init('lookup_types/Manufacturer/values');
			rmsServices.getById(sandFilter.Manufacturer).then(function(manufacturer){
				sandFilter.ManufacturerName=manufacturer.description;
			});
			rmsServices.init('lookup_types/Criticality/values');
			rmsServices.getById(sandFilter.Criticality).then(function(criticality){
				sandFilter.CriticalityName=criticality.description;
			});
			rmsServices.init('lookup_types/MaintananceContractor/values');
			rmsServices.getById(sandFilter.MaintenanceContractor).then(function(maintenanceContractor){
				sandFilter.MaintenanceContractorName=maintenanceContractor.description;
			});
			rmsServices.init('lookup_types/MaintainPeriod/values');
			rmsServices.getById(sandFilter.MaintainPeriod).then(function(maintainPeriod){
				sandFilter.MaintainPeriodName=maintainPeriod.description;
			});
			$scope.sandFilter = sandFilter ;
		});
	})
	.controller("SandFilterAddController", function($rootScope, $scope, $location, rmsServices){
		rmsServices.init('classes/SandFilter/cards');

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
			var sandFilter={};
			sandFilter=$scope.sandFilter;
			rmsServices.create(sandFilter,function(id){
				$location.path("/device/sandFilterList");
			});
		};
	})
	.controller("SandFilterUpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('classes/SandFilter/cards');
		rmsServices.getById($stateParams.id).then(function(sandFilter){
			$scope.sandFilter = sandFilter;
			console.log(sandFilter);
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
			rmsServices.init('classes/SandFilter/cards');
			rmsServices.update($scope.sandFilter).then(function(){
				$location.path("/device/sandFilterList");
			});

			//});

		};

	});