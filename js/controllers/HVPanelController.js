//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
	.controller("HVPanelListController", function($scope,rmsServices){
		console.log("HVPanelListController");
		rmsServices.init('classes/HVPanel/cards');
		rmsServices.getAll().then(function(all){
			$scope.HVPanels = all;
			$scope.displayedCollection = [].concat(all);
		});
		$scope.name = "RMS";
		$scope.$on("updateHVPanels", function (event, HVPanel) {
			$scope.HVPanels.push(HVPanel);
		});

		$scope.remove = function(idx){
			bootbox.confirm("確定刪除?", function(result) {
				if (result) {
					rmsServices.delete($scope.HVPanels[idx]).then(function(){
						$scope.HVPanels.splice(idx, 1);
					});
				}
			});
		};
	})
	.controller("HVPanelViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/HVPanel/cards');
		rmsServices.getById($stateParams.id).then(function(HVPanel){
			rmsServices.init('classes/Room/cards');
			rmsServices.getById(HVPanel.IsInRoom).then(function(room){
				HVPanel.RoomName=room.Name;
			});
			rmsServices.init('lookup_types/Manufacturer/values');
			rmsServices.getById(HVPanel.Manufacturer).then(function(manufacturer){
				HVPanel.ManufacturerName=manufacturer.description;
			});
			rmsServices.init('lookup_types/Criticality/values');
			rmsServices.getById(HVPanel.Criticality).then(function(criticality){
				HVPanel.CriticalityName=criticality.description;
			});
			rmsServices.init('lookup_types/MaintananceContractor/values');
			rmsServices.getById(HVPanel.MaintenanceContractor).then(function(maintenanceContractor){
				HVPanel.MaintenanceContractorName=maintenanceContractor.description;
			});
			rmsServices.init('lookup_types/MaintainPeriod/values');
			rmsServices.getById(HVPanel.MaintainPeriod).then(function(maintainPeriod){
				HVPanel.MaintainPeriodName=maintainPeriod.description;
			});
			$scope.HVPanel = HVPanel ;
		});
	})
	.controller("HVPanelAddController", function($rootScope, $scope, $location, rmsServices){
		rmsServices.init('classes/HVPanel/cards');

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

		$scope.func = "add";
		$scope.add = function(){
			var HVPanel={};
			HVPanel=$scope.HVPanel;
			rmsServices.create(HVPanel,function(id){
				$location.path("/device/HVPanelList");
			});
		};
	})
	.controller("HVPanelUpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('classes/HVPanel/cards');
		rmsServices.getById($stateParams.id).then(function(HVPanel){
			$scope.HVPanel = HVPanel;
			console.log(HVPanel);
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
			rmsServices.init('classes/HVPanel/cards');
			rmsServices.update($scope.HVPanel).then(function(){
				$location.path("/device/HVPanelList");
			});

			//});

		};

	});