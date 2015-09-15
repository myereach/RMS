//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
    .controller("PrimaryChilledWaterPumpListController", function($scope,rmsServices){
        console.log("PrimaryChilledWaterPumpListController");
		rmsServices.init('classes/PrimaryChilledWaterPump/cards');
		rmsServices.getAll().then(function(all){
			$scope.PrimaryChilledWaterPumps = all;
			$scope.displayedCollection = [].concat(all);
		});
    	$scope.name = "RMS";
		$scope.$on("updatePrimaryChilledWaterPumps", function (event, PrimaryChilledWaterPump) {
    		$scope.PrimaryChilledWaterPumps.push(PrimaryChilledWaterPump);
        });

    	 $scope.remove = function(idx){
			 bootbox.confirm("確定刪除?", function(result) {
				 if (result) {
					 rmsServices.delete($scope.PrimaryChilledWaterPumps[idx]).then(function(){
						 $scope.PrimaryChilledWaterPumps.splice(idx, 1);
					 });
				 }
			 });
         };
    })
    .controller("PrimaryChilledWaterPumpViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/PrimaryChilledWaterPump/cards');
		rmsServices.getById($stateParams.id).then(function(PrimaryChilledWaterPump){
			rmsServices.init('classes/Room/cards');
			rmsServices.getById(PrimaryChilledWaterPump.IsInRoom).then(function(room){
				PrimaryChilledWaterPump.RoomName=room.Name;
			});
			rmsServices.init('lookup_types/Manufacturer/values');
			rmsServices.getById(PrimaryChilledWaterPump.Manufacturer).then(function(manufacturer){
				PrimaryChilledWaterPump.ManufacturerName=manufacturer.description;			
			});
			rmsServices.init('lookup_types/Criticality/values');
			rmsServices.getById(PrimaryChilledWaterPump.Criticality).then(function(criticality){
				PrimaryChilledWaterPump.CriticalityName=criticality.description;			
			});
			rmsServices.init('lookup_types/MaintananceContractor/values');
			rmsServices.getById(PrimaryChilledWaterPump.MaintenanceContractor).then(function(maintenanceContractor){
				PrimaryChilledWaterPump.MaintenanceContractorName=maintenanceContractor.description;			
			});
			rmsServices.init('lookup_types/MaintainPeriod/values');
			rmsServices.getById(PrimaryChilledWaterPump.MaintainPeriod).then(function(maintainPeriod){
				PrimaryChilledWaterPump.MaintainPeriodName=maintainPeriod.description;			
			});
      $scope.PrimaryChilledWaterPump = PrimaryChilledWaterPump ;
		});
    })
    .controller("PrimaryChilledWaterPumpAddController", function($rootScope, $scope, $location, rmsServices){
		var Rooms = rmsServices.init('classes/Room/cards');
		var PrimaryChilledWaterPumps = rmsServices.init('classes/PrimaryChilledWaterPump/cards');
		$scope.func = "add";
    	$scope.add = function(){
    		var PrimaryChilledWaterPump={};
			PrimaryChilledWaterPump=$scope.PrimaryChilledWaterPump;
			rmsServices.create(PrimaryChilledWaterPump,function(id){
				$location.path("/device/PrimaryChilledWaterPumpList");
    		});
    	};
    })
    .controller("PrimaryChilledWaterPumpUpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('classes/PrimaryChilledWaterPump/cards');
		rmsServices.getById($stateParams.id).then(function(PrimaryChilledWaterPump){
			$scope.PrimaryChilledWaterPump = PrimaryChilledWaterPump;
			console.log(PrimaryChilledWaterPump);
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
					rmsServices.init('classes/PrimaryChilledWaterPump/cards');
					rmsServices.update($scope.PrimaryChilledWaterPump).then(function(){
						$location.path("/device/PrimaryChilledWaterPumpList");
					});

				//});

			};

    });