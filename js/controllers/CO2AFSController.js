//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
    .controller("CO2AFSListController", function($scope,rmsServices){
        console.log("CO2AFSListController");
		rmsServices.init('classes/CO2AFS/cards');
		rmsServices.getAll().then(function(all){
			$scope.co2AFSs = all;
			$scope.displayedCollection = [].concat(all);
			$scope.totalItemCount=$scope.displayedCollection.length;
		});
    	$scope.name = "RMS";
		$scope.$on("updateCO2AFSs", function (event, co2AFS) {
    		$scope.co2AFSs.push(co2AFS);
        });

    	 $scope.remove = function(idx){
			 bootbox.confirm("確定刪除?", function(result) {
				 if (result) {
					 rmsServices.delete($scope.co2AFSs[idx]).then(function(){
						 $scope.co2AFSs.splice(idx, 1);
					 });
				 }
			 });
         };
    })
    .controller("CO2AFSViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/CO2AFS/cards');
		rmsServices.getById($stateParams.id).then(function(co2AFS){
			rmsServices.init('classes/Room/cards');
			rmsServices.getById(co2AFS.IsInRoom).then(function(room){
				co2AFS.RoomName=room.Name;
			});
			rmsServices.init('lookup_types/Manufacturer/values');
			rmsServices.getById(co2AFS.Manufacturer).then(function(manufacturer){
				co2AFS.ManufacturerName=manufacturer.description;			
			});
			rmsServices.init('lookup_types/Criticality/values');
			rmsServices.getById(co2AFS.Criticality).then(function(criticality){
				co2AFS.CriticalityName=criticality.description;			
			});
			rmsServices.init('lookup_types/MaintananceContractor/values');
			rmsServices.getById(co2AFS.MaintenanceContractor).then(function(maintenanceContractor){
				co2AFS.MaintenanceContractorName=maintenanceContractor.description;			
			});
			rmsServices.init('lookup_types/MaintainPeriod/values');
			rmsServices.getById(co2AFS.MaintainPeriod).then(function(maintainPeriod){
				co2AFS.MaintainPeriodName=maintainPeriod.description;			
			});
      $scope.co2AFS = co2AFS ;
		});
    })
    .controller("CO2AFSAddController", function($rootScope, $scope, $location, rmsServices){
		var Rooms = rmsServices.init('classes/Room/cards');
		var CO2AFSs = rmsServices.init('classes/CO2AFS/cards');
		$scope.func = "add";
    	$scope.add = function(){
    		var co2AFS={};
			co2AFS=$scope.co2AFS;
			rmsServices.create(co2AFS,function(id){
				$location.path("/device/co2AFSList");
    		});
    	};
    })
    .controller("CO2AFSUpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('classes/CO2AFS/cards');
		rmsServices.getById($stateParams.id).then(function(co2AFS){
			$scope.co2AFS = co2AFS;
			console.log(co2AFS);
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
					rmsServices.init('classes/CO2AFS/cards');
					rmsServices.update($scope.co2AFS).then(function(){
						$location.path("/device/co2AFSList");
					});

				//});

			};
    });