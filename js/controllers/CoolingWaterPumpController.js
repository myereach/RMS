//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
    .controller("CoolingWaterPumpListController", function($scope,rmsServices){
        console.log("CoolingWaterPumpListController");
		rmsServices.init('classes/CoolingWaterPump/cards');
		rmsServices.getAll().then(function(all){
			$scope.CoolingWaterPumps = all;
			$scope.displayedCollection = [].concat(all);
		});
    	$scope.name = "RMS";
		$scope.$on("updateCoolingWaterPumps", function (event, CoolingWaterPump) {
    		$scope.CoolingWaterPumps.push(CoolingWaterPump);
        });

    	 $scope.remove = function(idx){
			 bootbox.confirm("確定刪除?", function(result) {
				 if (result) {
					 rmsServices.delete($scope.CoolingWaterPumps[idx]).then(function(){
						 $scope.CoolingWaterPumps.splice(idx, 1);
					 });
				 }
			 });
         };
    })
    .controller("CoolingWaterPumpViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/CoolingWaterPump/cards');
		rmsServices.getById($stateParams.id).then(function(CoolingWaterPump){
			rmsServices.init('classes/Room/cards');
			rmsServices.getById(CoolingWaterPump.IsInRoom).then(function(room){
				CoolingWaterPump.RoomName=room.Name;
			});
			rmsServices.init('lookup_types/Manufacturer/values');
			rmsServices.getById(CoolingWaterPump.Manufacturer).then(function(manufacturer){
				CoolingWaterPump.ManufacturerName=manufacturer.description;			
			});
			rmsServices.init('lookup_types/Criticality/values');
			rmsServices.getById(CoolingWaterPump.Criticality).then(function(criticality){
				CoolingWaterPump.CriticalityName=criticality.description;			
			});
			rmsServices.init('lookup_types/MaintananceContractor/values');
			rmsServices.getById(CoolingWaterPump.MaintenanceContractor).then(function(maintenanceContractor){
				CoolingWaterPump.MaintenanceContractorName=maintenanceContractor.description;			
			});
			rmsServices.init('lookup_types/MaintainPeriod/values');
			rmsServices.getById(CoolingWaterPump.MaintainPeriod).then(function(maintainPeriod){
				CoolingWaterPump.MaintainPeriodName=maintainPeriod.description;			
			});
      $scope.CoolingWaterPump = CoolingWaterPump ;
		});
    })
    .controller("CoolingWaterPumpAddController", function($rootScope, $scope, $location, rmsServices){
		var Rooms = rmsServices.init('classes/Room/cards');
		var CoolingWaterPumps = rmsServices.init('classes/CoolingWaterPump/cards');
		$scope.func = "add";
    	$scope.add = function(){
    		var CoolingWaterPump={};
			CoolingWaterPump=$scope.CoolingWaterPump;
			rmsServices.create(CoolingWaterPump,function(id){
				$location.path("/device/CoolingWaterPumpList");
    		});
    	};
    })
    .controller("CoolingWaterPumpUpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('classes/CoolingWaterPump/cards');
		rmsServices.getById($stateParams.id).then(function(CoolingWaterPump){
			$scope.CoolingWaterPump = CoolingWaterPump;
			console.log(CoolingWaterPump);
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
					rmsServices.init('classes/CoolingWaterPump/cards');
					rmsServices.update($scope.CoolingWaterPump).then(function(){
						$location.path("/device/CoolingWaterPumpList");
					});

				//});

			};

    });