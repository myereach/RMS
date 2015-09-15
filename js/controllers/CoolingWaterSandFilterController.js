//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
    .controller("CoolingWaterSandFilterListController", function($scope,rmsServices){
        console.log("CoolingWaterSandFilterListController");
		rmsServices.init('classes/CoolingWaterSandFilter/cards');
		rmsServices.getAll().then(function(all){
			$scope.CoolingWaterSandFilters = all;
			$scope.displayedCollection = [].concat(all);
		});
    	$scope.name = "RMS";
		$scope.$on("updateCoolingWaterSandFilters", function (event, CoolingWaterSandFilter) {
    		$scope.CoolingWaterSandFilters.push(CoolingWaterSandFilter);
        });

    	 $scope.remove = function(idx){
			 bootbox.confirm("確定刪除?", function(result) {
				 if (result) {
					 rmsServices.delete($scope.CoolingWaterSandFilters[idx]).then(function(){
						 $scope.CoolingWaterSandFilters.splice(idx, 1);
					 });
				 }
			 });
         };
    })
    .controller("CoolingWaterSandFilterViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/CoolingWaterSandFilter/cards');
		rmsServices.getById($stateParams.id).then(function(CoolingWaterSandFilter){
			rmsServices.init('classes/Room/cards');
			rmsServices.getById(CoolingWaterSandFilter.IsInRoom).then(function(room){
				CoolingWaterSandFilter.RoomName=room.Name;
			});
			rmsServices.init('lookup_types/Manufacturer/values');
			rmsServices.getById(CoolingWaterSandFilter.Manufacturer).then(function(manufacturer){
				CoolingWaterSandFilter.ManufacturerName=manufacturer.description;			
			});
			rmsServices.init('lookup_types/Criticality/values');
			rmsServices.getById(CoolingWaterSandFilter.Criticality).then(function(criticality){
				CoolingWaterSandFilter.CriticalityName=criticality.description;			
			});
			rmsServices.init('lookup_types/MaintananceContractor/values');
			rmsServices.getById(CoolingWaterSandFilter.MaintenanceContractor).then(function(maintenanceContractor){
				CoolingWaterSandFilter.MaintenanceContractorName=maintenanceContractor.description;			
			});
			rmsServices.init('lookup_types/MaintainPeriod/values');
			rmsServices.getById(CoolingWaterSandFilter.MaintainPeriod).then(function(maintainPeriod){
				CoolingWaterSandFilter.MaintainPeriodName=maintainPeriod.description;			
			});
      $scope.CoolingWaterSandFilter = CoolingWaterSandFilter ;
		});
    })
    .controller("CoolingWaterSandFilterAddController", function($rootScope, $scope, $location, rmsServices){
		var Rooms = rmsServices.init('classes/Room/cards');
		var CoolingWaterSandFilters = rmsServices.init('classes/CoolingWaterSandFilter/cards');
		$scope.func = "add";
    	$scope.add = function(){
    		var CoolingWaterSandFilter={};
			CoolingWaterSandFilter=$scope.CoolingWaterSandFilter;
			rmsServices.create(CoolingWaterSandFilter,function(id){
				$location.path("/device/CoolingWaterSandFilterList");
    		});
    	};
    })
    .controller("CoolingWaterSandFilterUpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('classes/CoolingWaterSandFilter/cards');
		rmsServices.getById($stateParams.id).then(function(CoolingWaterSandFilter){
			$scope.CoolingWaterSandFilter = CoolingWaterSandFilter;
			console.log(CoolingWaterSandFilter);
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
					rmsServices.init('classes/CoolingWaterSandFilter/cards');
					rmsServices.update($scope.CoolingWaterSandFilter).then(function(){
						$location.path("/device/CoolingWaterSandFilterList");
					});

				//});

			};

    });