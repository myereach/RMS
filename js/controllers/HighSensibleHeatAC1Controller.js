//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
    .controller("HighSensibleHeatAC1ListController", function($scope,rmsServices){
        console.log("HighSensibleHeatAC1ListController");
		rmsServices.init('classes/HighSensibleHeatAC1/cards');
		rmsServices.getAll().then(function(all){
			$scope.HighSensibleHeatAC1s = all;
			$scope.displayedCollection = [].concat(all);
		});
    	$scope.name = "RMS";
		$scope.$on("updateHighSensibleHeatAC1s", function (event, HighSensibleHeatAC1) {
    		$scope.HighSensibleHeatAC1s.push(HighSensibleHeatAC1);
        });

    	 $scope.remove = function(idx){
			 bootbox.confirm("確定刪除?", function(result) {
				 if (result) {
					 rmsServices.delete($scope.HighSensibleHeatAC1s[idx]).then(function(){
						 $scope.HighSensibleHeatAC1s.splice(idx, 1);
					 });
				 }
			 });
         };
    })
    .controller("HighSensibleHeatAC1ViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/HighSensibleHeatAC1/cards');
		rmsServices.getById($stateParams.id).then(function(HighSensibleHeatAC1){
			rmsServices.init('classes/Room/cards');
			rmsServices.getById(HighSensibleHeatAC1.IsInRoom).then(function(room){
				HighSensibleHeatAC1.RoomName=room.Name;
			});
			rmsServices.init('lookup_types/Manufacturer/values');
			rmsServices.getById(HighSensibleHeatAC1.Manufacturer).then(function(manufacturer){
				HighSensibleHeatAC1.ManufacturerName=manufacturer.description;			
			});
			rmsServices.init('lookup_types/Criticality/values');
			rmsServices.getById(HighSensibleHeatAC1.Criticality).then(function(criticality){
				HighSensibleHeatAC1.CriticalityName=criticality.description;			
			});
			rmsServices.init('lookup_types/MaintananceContractor/values');
			rmsServices.getById(HighSensibleHeatAC1.MaintenanceContractor).then(function(maintenanceContractor){
				HighSensibleHeatAC1.MaintenanceContractorName=maintenanceContractor.description;			
			});
			rmsServices.init('lookup_types/MaintainPeriod/values');
			rmsServices.getById(HighSensibleHeatAC1.MaintainPeriod).then(function(maintainPeriod){
				HighSensibleHeatAC1.MaintainPeriodName=maintainPeriod.description;			
			});
      $scope.HighSensibleHeatAC1 = HighSensibleHeatAC1 ;
		});
    })
    .controller("HighSensibleHeatAC1AddController", function($rootScope, $scope, $location, rmsServices){
		var Rooms = rmsServices.init('classes/Room/cards');
		var HighSensibleHeatAC1s = rmsServices.init('classes/HighSensibleHeatAC1/cards');
		$scope.func = "add";
    	$scope.add = function(){
    		var HighSensibleHeatAC1={};
			HighSensibleHeatAC1=$scope.HighSensibleHeatAC1;
			rmsServices.create(HighSensibleHeatAC1,function(id){
				$location.path("/device/HighSensibleHeatAC1List");
    		});
    	};
    })
    .controller("HighSensibleHeatAC1UpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('classes/HighSensibleHeatAC1/cards');
		rmsServices.getById($stateParams.id).then(function(HighSensibleHeatAC1){
			$scope.HighSensibleHeatAC1 = HighSensibleHeatAC1;
			console.log(HighSensibleHeatAC1);
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
					rmsServices.init('classes/HighSensibleHeatAC1/cards');
					rmsServices.update($scope.HighSensibleHeatAC1).then(function(){
						$location.path("/device/HighSensibleHeatAC1List");
					});

				//});

			};

    });