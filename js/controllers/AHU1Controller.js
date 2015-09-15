//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
	.controller("AHU1ListController", function($scope,rmsServices){
		console.log("AHU1ListController");
		rmsServices.init('classes/AHU1/cards');
		rmsServices.getAll().then(function(all){
			$scope.AHU1s = all;
			$scope.displayedCollection = [].concat(all);
		});
		$scope.name = "RMS";
		$scope.$on("updateAHU1s", function (event, AHU1) {
			$scope.AHU1s.push(AHU1);
		});

		$scope.remove = function(idx){
			bootbox.confirm("確定刪除?", function(result) {
				if (result) {
					rmsServices.delete($scope.AHU1s[idx]).then(function(){
						$scope.AHU1s.splice(idx, 1);
					});
				}
			});
		};
	})
	.controller("AHU1ViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/AHU1/cards');
		rmsServices.getById($stateParams.id).then(function(AHU1){
			rmsServices.init('classes/Room/cards');
			rmsServices.getById(AHU1.IsInRoom).then(function(room){
				AHU1.RoomName=room.Name;
			});
			rmsServices.init('lookup_types/Manufacturer/values');
			rmsServices.getById(AHU1.Manufacturer).then(function(manufacturer){
				AHU1.ManufacturerName=manufacturer.description;
			});
			rmsServices.init('lookup_types/Criticality/values');
			rmsServices.getById(AHU1.Criticality).then(function(criticality){
				AHU1.CriticalityName=criticality.description;
			});
			rmsServices.init('lookup_types/MaintananceContractor/values');
			rmsServices.getById(AHU1.MaintenanceContractor).then(function(maintenanceContractor){
				AHU1.MaintenanceContractorName=maintenanceContractor.description;
			});
			rmsServices.init('lookup_types/MaintainPeriod/values');
			rmsServices.getById(AHU1.MaintainPeriod).then(function(maintainPeriod){
				AHU1.MaintainPeriodName=maintainPeriod.description;
			});
			$scope.AHU1 = AHU1 ;
		});
	})
	.controller("AHU1AddController", function($rootScope, $scope, $location, rmsServices){
		rmsServices.init('classes/AHU1/cards');

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
			var AHU1={};
			AHU1=$scope.AHU1;
			rmsServices.create(AHU1,function(id){
				$location.path("/device/AHU1List");
			});
		};
	})
	.controller("AHU1UpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('classes/AHU1/cards');
		rmsServices.getById($stateParams.id).then(function(AHU1){
			$scope.AHU1 = AHU1;
			console.log(AHU1);
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
			rmsServices.init('classes/AHU1/cards');
			rmsServices.update($scope.AHU1).then(function(){
				$location.path("/device/AHU1List");
			});

			//});

		};

	});