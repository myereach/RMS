//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
    .controller("FM200ListController", function($scope,rmsServices){
        console.log("FM200ListController");
		rmsServices.init('classes/FM200/cards');
		rmsServices.getAll().then(function(all){
			$scope.FM200s = all;
			$scope.displayedCollection = [].concat(all);
		});
    	$scope.name = "RMS";
		$scope.$on("updateFM200s", function (event, FM200) {
    		$scope.FM200s.push(FM200);
        });

    	 $scope.remove = function(idx){
			 bootbox.confirm("確定刪除?", function(result) {
				 if (result) {
					 rmsServices.delete($scope.FM200s[idx]).then(function(){
						 $scope.FM200s.splice(idx, 1);
					 });
				 }
			 });
         };
    })
    .controller("FM200ViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/FM200/cards');
		rmsServices.getById($stateParams.id).then(function(FM200){
			rmsServices.init('classes/Room/cards');
			rmsServices.getById(FM200.IsInRoom).then(function(room){
				FM200.RoomName=room.Name;
			});
			rmsServices.init('lookup_types/Manufacturer/values');
			rmsServices.getById(FM200.Manufacturer).then(function(manufacturer){
				FM200.ManufacturerName=manufacturer.description;			
			});
			rmsServices.init('lookup_types/Criticality/values');
			rmsServices.getById(FM200.Criticality).then(function(criticality){
				FM200.CriticalityName=criticality.description;			
			});
			rmsServices.init('lookup_types/MaintananceContractor/values');
			rmsServices.getById(FM200.MaintenanceContractor).then(function(maintenanceContractor){
				FM200.MaintenanceContractorName=maintenanceContractor.description;			
			});
			rmsServices.init('lookup_types/MaintainPeriod/values');
			rmsServices.getById(FM200.MaintainPeriod).then(function(maintainPeriod){
				FM200.MaintainPeriodName=maintainPeriod.description;			
			});
      $scope.FM200 = FM200 ;
		});
    })
    .controller("FM200AddController", function($rootScope, $scope, $location, rmsServices){
		var Rooms = rmsServices.init('classes/Room/cards');
		var FM200s = rmsServices.init('classes/FM200/cards');
		$scope.func = "add";
    	$scope.add = function(){
    		var FM200={};
			FM200=$scope.FM200;
			rmsServices.create(FM200,function(id){
				$location.path("/device/FM200List");
    		});
    	};
    })
    .controller("FM200UpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('classes/FM200/cards');
		rmsServices.getById($stateParams.id).then(function(FM200){
			$scope.FM200 = FM200;
			console.log(FM200);
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
					rmsServices.init('classes/FM200/cards');
					rmsServices.update($scope.FM200).then(function(){
						$location.path("/device/FM200List");
					});

				//});

			};

    });