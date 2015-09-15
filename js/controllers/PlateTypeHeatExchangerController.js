//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
    .controller("PlateTypeHeatExchangerListController", function($scope,rmsServices){
        console.log("PlateTypeHeatExchangerListController");
		rmsServices.init('classes/PlateTypeHeatExchanger/cards');
		rmsServices.getAll().then(function(all){
			$scope.PlateTypeHeatExchangers = all;
			$scope.displayedCollection = [].concat(all);
		});
    	$scope.name = "RMS";
		$scope.$on("updatePlateTypeHeatExchangers", function (event, PlateTypeHeatExchanger) {
    		$scope.PlateTypeHeatExchangers.push(PlateTypeHeatExchanger);
        });

    	 $scope.remove = function(idx){
			 bootbox.confirm("確定刪除?", function(result) {
				 if (result) {
					 rmsServices.delete($scope.PlateTypeHeatExchangers[idx]).then(function(){
						 $scope.PlateTypeHeatExchangers.splice(idx, 1);
					 });
				 }
			 });
         };
    })
    .controller("PlateTypeHeatExchangerViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/PlateTypeHeatExchanger/cards');
		rmsServices.getById($stateParams.id).then(function(PlateTypeHeatExchanger){
			rmsServices.init('classes/Room/cards');
			rmsServices.getById(PlateTypeHeatExchanger.IsInRoom).then(function(room){
				PlateTypeHeatExchanger.RoomName=room.Name;
			});
			rmsServices.init('lookup_types/Manufacturer/values');
			rmsServices.getById(PlateTypeHeatExchanger.Manufacturer).then(function(manufacturer){
				PlateTypeHeatExchanger.ManufacturerName=manufacturer.description;			
			});
			rmsServices.init('lookup_types/Criticality/values');
			rmsServices.getById(PlateTypeHeatExchanger.Criticality).then(function(criticality){
				PlateTypeHeatExchanger.CriticalityName=criticality.description;			
			});
			rmsServices.init('lookup_types/MaintananceContractor/values');
			rmsServices.getById(PlateTypeHeatExchanger.MaintenanceContractor).then(function(maintenanceContractor){
				PlateTypeHeatExchanger.MaintenanceContractorName=maintenanceContractor.description;			
			});
			rmsServices.init('lookup_types/MaintainPeriod/values');
			rmsServices.getById(PlateTypeHeatExchanger.MaintainPeriod).then(function(maintainPeriod){
				PlateTypeHeatExchanger.MaintainPeriodName=maintainPeriod.description;			
			});
      $scope.PlateTypeHeatExchanger = PlateTypeHeatExchanger ;
		});
    })
    .controller("PlateTypeHeatExchangerAddController", function($rootScope, $scope, $location, rmsServices){
		var Rooms = rmsServices.init('classes/Room/cards');
		var PlateTypeHeatExchangers = rmsServices.init('classes/PlateTypeHeatExchanger/cards');
		$scope.func = "add";
    	$scope.add = function(){
    		var PlateTypeHeatExchanger={};
			PlateTypeHeatExchanger=$scope.PlateTypeHeatExchanger;
			rmsServices.create(PlateTypeHeatExchanger,function(id){
				$location.path("/device/PlateTypeHeatExchangerList");
    		});
    	};
    })
    .controller("PlateTypeHeatExchangerUpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('classes/PlateTypeHeatExchanger/cards');
		rmsServices.getById($stateParams.id).then(function(PlateTypeHeatExchanger){
			$scope.PlateTypeHeatExchanger = PlateTypeHeatExchanger;
			console.log(PlateTypeHeatExchanger);
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
					rmsServices.init('classes/PlateTypeHeatExchanger/cards');
					rmsServices.update($scope.PlateTypeHeatExchanger).then(function(){
						$location.path("/device/PlateTypeHeatExchangerList");
					});

				//});

			};

    });