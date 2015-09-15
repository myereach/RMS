//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
	.controller("CentrifugalChillerListController", function($scope,rmsServices){
		console.log("CentrifugalChillerListController");
		rmsServices.init('classes/CentrifugalChiller/cards');
		rmsServices.getAll().then(function(all){
			$scope.centrifugalChillers = all;
			$scope.displayedCollection = [].concat(all);
		});
		$scope.name = "RMS";
		$scope.$on("updateCentrifugalChillers", function (event, centrifugalChiller) {
			$scope.centrifugalChillers.push(centrifugalChiller);
		});

		$scope.remove = function(idx){
			bootbox.confirm("確定刪除?", function(result) {
				if (result) {
					rmsServices.delete($scope.centrifugalChillers[idx]).then(function(){
						$scope.centrifugalChillers.splice(idx, 1);
					});
				}
			});
		};
	})
	.controller("CentrifugalChillerViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/CentrifugalChiller/cards');
		rmsServices.getById($stateParams.id).then(function(centrifugalChiller){
			rmsServices.init('classes/Room/cards');
			rmsServices.getById(centrifugalChiller.IsInRoom).then(function(room){
				centrifugalChiller.RoomName=room.Name;
			});
			rmsServices.init('lookup_types/Manufacturer/values');
			rmsServices.getById(centrifugalChiller.Manufacturer).then(function(manufacturer){
				centrifugalChiller.ManufacturerName=manufacturer.description;
			});
			rmsServices.init('lookup_types/Criticality/values');
			rmsServices.getById(centrifugalChiller.Criticality).then(function(criticality){
				centrifugalChiller.CriticalityName=criticality.description;
			});
			rmsServices.init('lookup_types/MaintananceContractor/values');
			rmsServices.getById(centrifugalChiller.MaintenanceContractor).then(function(maintenanceContractor){
				centrifugalChiller.MaintenanceContractorName=maintenanceContractor.description;
			});
			rmsServices.init('lookup_types/MaintainPeriod/values');
			rmsServices.getById(centrifugalChiller.MaintainPeriod).then(function(maintainPeriod){
				centrifugalChiller.MaintainPeriodName=maintainPeriod.description;
			});
			$scope.centrifugalChiller = centrifugalChiller ;
		});
	})
	.controller("CentrifugalChillerAddController", function($rootScope, $scope, $location, rmsServices){
		rmsServices.init('classes/CentrifugalChiller/cards');

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
			var centrifugalChiller={};
			centrifugalChiller=$scope.centrifugalChiller;
			rmsServices.create(centrifugalChiller,function(id){
				$location.path("/device/centrifugalChillerList");
			});
		};
	})
	.controller("CentrifugalChillerUpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('classes/CentrifugalChiller/cards');
		rmsServices.getById($stateParams.id).then(function(centrifugalChiller){
			$scope.centrifugalChiller = centrifugalChiller;
			console.log(centrifugalChiller);
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
			rmsServices.init('classes/CentrifugalChiller/cards');
			rmsServices.update($scope.centrifugalChiller).then(function(){
				$location.path("/device/centrifugalChillerList");
			});

			//});

		};

	});