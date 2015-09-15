//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
    .controller("LVPanelListController", function($scope,rmsServices){
        console.log("LVPanelListController");
		rmsServices.init('classes/LVPanel/cards');
		rmsServices.getAll().then(function(all){
			$scope.LVPanels = all;
			$scope.displayedCollection = [].concat(all);
		});
    	$scope.name = "RMS";
		$scope.$on("updateLVPanels", function (event, LVPanel) {
    		$scope.LVPanels.push(LVPanel);
        });

    	 $scope.remove = function(idx){
			 bootbox.confirm("確定刪除?", function(result) {
				 if (result) {
					 rmsServices.delete($scope.LVPanels[idx]).then(function(){
						 $scope.LVPanels.splice(idx, 1);
					 });
				 }
			 });
         };
    })
    .controller("LVPanelViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/LVPanel/cards');
		rmsServices.getById($stateParams.id).then(function(LVPanel){
			rmsServices.init('classes/Room/cards');
			rmsServices.getById(LVPanel.IsInRoom).then(function(room){
				LVPanel.RoomName=room.Name;
			});
			rmsServices.init('lookup_types/Manufacturer/values');
			rmsServices.getById(LVPanel.Manufacturer).then(function(manufacturer){
				LVPanel.ManufacturerName=manufacturer.description;			
			});
			rmsServices.init('lookup_types/Criticality/values');
			rmsServices.getById(LVPanel.Criticality).then(function(criticality){
				LVPanel.CriticalityName=criticality.description;			
			});
			rmsServices.init('lookup_types/MaintananceContractor/values');
			rmsServices.getById(LVPanel.MaintenanceContractor).then(function(maintenanceContractor){
				LVPanel.MaintenanceContractorName=maintenanceContractor.description;			
			});
			rmsServices.init('lookup_types/MaintainPeriod/values');
			rmsServices.getById(LVPanel.MaintainPeriod).then(function(maintainPeriod){
				LVPanel.MaintainPeriodName=maintainPeriod.description;			
			});
      $scope.LVPanel = LVPanel ;
		});
    })
    .controller("LVPanelAddController", function($rootScope, $scope, $location, rmsServices){
		var Rooms = rmsServices.init('classes/Room/cards');
		var LVPanels = rmsServices.init('classes/LVPanel/cards');
		$scope.func = "add";
    	$scope.add = function(){
    		var LVPanel={};
			LVPanel=$scope.LVPanel;
			rmsServices.create(LVPanel,function(id){
				$location.path("/device/LVPanelList");
    		});
    	};
    })
    .controller("LVPanelUpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('classes/LVPanel/cards');
		rmsServices.getById($stateParams.id).then(function(LVPanel){
			$scope.LVPanel = LVPanel;
			console.log(LVPanel);
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
					rmsServices.init('classes/LVPanel/cards');
					rmsServices.update($scope.LVPanel).then(function(){
						$location.path("/device/LVPanelList");
					});

				//});

			};

    });