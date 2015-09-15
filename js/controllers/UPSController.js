//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
    .controller("UPSListController", function($scope,rmsServices){
        console.log("UPSListController");
		rmsServices.init('classes/test/cards');
		rmsServices.getAll().then(function(all){
			$scope.UPSs = all;
			$scope.displayedCollection = [].concat(all);
		});
    	$scope.name = "RMS";
		$scope.$on("updateUPSs", function (event, UPS) {
    		$scope.UPSs.push(UPS);
        });

    	 $scope.remove = function(idx){
			 bootbox.confirm("確定刪除?", function(result) {
				 if (result) {
					 rmsServices.delete($scope.UPSs[idx]).then(function(){
						 $scope.UPSs.splice(idx, 1);
					 });
				 }
			 });
         };
    })
    .controller("UPSViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/test/cards');
		rmsServices.getById($stateParams.id).then(function(UPS){
			rmsServices.init('classes/Room/cards');
			rmsServices.getById(UPS.IsInRoom).then(function(room){
				UPS.RoomName=room.Name;
			});
			rmsServices.init('lookup_types/Manufacturer/values');
			rmsServices.getById(UPS.Manufacturer).then(function(manufacturer){
				UPS.ManufacturerName=manufacturer.description;			
			});
			rmsServices.init('lookup_types/Criticality/values');
			rmsServices.getById(UPS.Criticality).then(function(criticality){
				UPS.CriticalityName=criticality.description;			
			});
			rmsServices.init('lookup_types/MaintananceContractor/values');
			rmsServices.getById(UPS.MaintenanceContractor).then(function(maintenanceContractor){
				UPS.MaintenanceContractorName=maintenanceContractor.description;			
			});
			rmsServices.init('lookup_types/MaintainPeriod/values');
			rmsServices.getById(UPS.MaintainPeriod).then(function(maintainPeriod){
				UPS.MaintainPeriodName=maintainPeriod.description;			
			});
      $scope.UPS = UPS ;
		});
    })
    .controller("UPSAddController", function($rootScope, $scope, $location, rmsServices){
		var Rooms = rmsServices.init('classes/Room/cards');
		var UPSs = rmsServices.init('classes/test/cards');
		$scope.func = "add";
    	$scope.add = function(){
    		var UPS={};
			UPS=$scope.UPS;
			rmsServices.create(UPS,function(id){
				$location.path("/device/UPSList");
    		});
    	};
    })
    .controller("UPSUpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('classes/test/cards');
		rmsServices.getById($stateParams.id).then(function(UPS){
			$scope.UPS = UPS;
			console.log(UPS);
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
					rmsServices.init('classes/test/cards');
					rmsServices.update($scope.UPS).then(function(){
						$location.path("/device/UPSList");
					});

				//});

			};

    });