//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
    .controller("AHU2ListController", function($scope,rmsServices){
        console.log("AHU2ListController");
		rmsServices.init('classes/AHU2/cards');
		rmsServices.getAll().then(function(all){
			$scope.AHU2s = all;
			$scope.displayedCollection = [].concat(all);
		});
    	$scope.name = "RMS";
		$scope.$on("updateAHU2s", function (event, AHU2) {
    		$scope.AHU2s.push(AHU2);
        });

    	 $scope.remove = function(idx){
			 bootbox.confirm("確定刪除?", function(result) {
				 if (result) {
					 rmsServices.delete($scope.AHU2s[idx]).then(function(){
						 $scope.AHU2s.splice(idx, 1);
					 });
				 }
			 });
         };
    })
    .controller("AHU2ViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/AHU2/cards');
		rmsServices.getById($stateParams.id).then(function(AHU2){
			rmsServices.init('classes/Room/cards');
			rmsServices.getById(AHU2.IsInRoom).then(function(room){
				AHU2.RoomName=room.Name;
			});
			rmsServices.init('lookup_types/Manufacturer/values');
			rmsServices.getById(AHU2.Manufacturer).then(function(manufacturer){
				AHU2.ManufacturerName=manufacturer.description;			
			});
			rmsServices.init('lookup_types/Criticality/values');
			rmsServices.getById(AHU2.Criticality).then(function(criticality){
				AHU2.CriticalityName=criticality.description;			
			});
			rmsServices.init('lookup_types/MaintananceContractor/values');
			rmsServices.getById(AHU2.MaintenanceContractor).then(function(maintenanceContractor){
				AHU2.MaintenanceContractorName=maintenanceContractor.description;			
			});
			rmsServices.init('lookup_types/MaintainPeriod/values');
			rmsServices.getById(AHU2.MaintainPeriod).then(function(maintainPeriod){
				AHU2.MaintainPeriodName=maintainPeriod.description;			
			});
      $scope.AHU2 = AHU2 ;
		});
    })
    .controller("AHU2AddController", function($rootScope, $scope, $location, rmsServices){
		var Rooms = rmsServices.init('classes/Room/cards');
		var AHU2s = rmsServices.init('classes/AHU2/cards');
		$scope.func = "add";
    	$scope.add = function(){
    		var AHU2={};
			AHU2=$scope.AHU2;
			rmsServices.create(AHU2,function(id){
				$location.path("/device/AHU2List");
    		});
    	};
    })
    .controller("AHU2UpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('classes/AHU2/cards');
		rmsServices.getById($stateParams.id).then(function(AHU2){
			$scope.AHU2 = AHU2;
			console.log(AHU2);
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
					rmsServices.init('classes/AHU2/cards');
					rmsServices.update($scope.AHU2).then(function(){
						$location.path("/device/AHU2List");
					});

				//});

			};

    });