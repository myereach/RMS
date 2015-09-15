//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
    .controller("VESDAListController", function($scope,rmsServices){
        console.log("VESDAListController");
		rmsServices.init('classes/VESDA/cards');
		rmsServices.getAll().then(function(all){
			$scope.VESDAs = all;
			$scope.displayedCollection = [].concat(all);
		});
    	$scope.name = "RMS";
		$scope.$on("updateVESDAs", function (event, VESDA) {
    		$scope.VESDAs.push(VESDA);
        });

    	 $scope.remove = function(idx){
			 bootbox.confirm("確定刪除?", function(result) {
				 if (result) {
					 rmsServices.delete($scope.VESDAs[idx]).then(function(){
						 $scope.VESDAs.splice(idx, 1);
					 });
				 }
			 });
         };
    })
    .controller("VESDAViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/VESDA/cards');
		rmsServices.getById($stateParams.id).then(function(VESDA){
			rmsServices.init('classes/Room/cards');
			rmsServices.getById(VESDA.IsInRoom).then(function(room){
				VESDA.RoomName=room.Name;
			});
			rmsServices.init('lookup_types/Manufacturer/values');
			rmsServices.getById(VESDA.Manufacturer).then(function(manufacturer){
				VESDA.ManufacturerName=manufacturer.description;			
			});
			rmsServices.init('lookup_types/Criticality/values');
			rmsServices.getById(VESDA.Criticality).then(function(criticality){
				VESDA.CriticalityName=criticality.description;			
			});
			rmsServices.init('lookup_types/MaintananceContractor/values');
			rmsServices.getById(VESDA.MaintenanceContractor).then(function(maintenanceContractor){
				VESDA.MaintenanceContractorName=maintenanceContractor.description;			
			});
			rmsServices.init('lookup_types/MaintainPeriod/values');
			rmsServices.getById(VESDA.MaintainPeriod).then(function(maintainPeriod){
				VESDA.MaintainPeriodName=maintainPeriod.description;			
			});
      $scope.VESDA = VESDA ;
		});
    })
    .controller("VESDAAddController", function($rootScope, $scope, $location, rmsServices){
		var Rooms = rmsServices.init('classes/Room/cards');
		var VESDAs = rmsServices.init('classes/VESDA/cards');
		$scope.func = "add";
    	$scope.add = function(){
    		var VESDA={};
			VESDA=$scope.VESDA;
			rmsServices.create(VESDA,function(id){
				$location.path("/device/VESDAList");
    		});
    	};
    })
    .controller("VESDAUpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('classes/VESDA/cards');
		rmsServices.getById($stateParams.id).then(function(VESDA){
			$scope.VESDA = VESDA;
			console.log(VESDA);
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
					rmsServices.init('classes/VESDA/cards');
					rmsServices.update($scope.VESDA).then(function(){
						$location.path("/device/VESDAList");
					});

				//});

			};

    });