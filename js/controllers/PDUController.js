//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
    .controller("PDUListController", function($scope,rmsServices){
        console.log("PDUListController");
		rmsServices.init('classes/GenericElectricalDevice/cards');
		rmsServices.getAll().then(function(all){
			$scope.PDUs = all;
			$scope.displayedCollection = [].concat(all);
			$scope.totalItemCount=$scope.displayedCollection.length;
		});
    	$scope.name = "RMS";
		$scope.$on("updatePDUs", function (event, PDU) {
    		$scope.PDUs.push(PDU);
        });

    	 $scope.remove = function(idx){
			 bootbox.confirm("確定刪除?", function(result) {
				 if (result) {
					 rmsServices.delete($scope.PDUs[idx]).then(function(){
						 $scope.PDUs.splice(idx, 1);
					 });
				 }
			 });
         };
    })
    .controller("PDUViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('classes/GenericElectricalDevice/cards');
		rmsServices.getById($stateParams.id).then(function(PDU){
			rmsServices.init('classes/Room/cards');
			rmsServices.getById(PDU.IsInRoom).then(function(room){
				PDU.RoomName=room.Name;
			});
			rmsServices.init('lookup_types/Manufacturer/values');
			rmsServices.getById(PDU.Manufacturer).then(function(manufacturer){
				PDU.ManufacturerName=manufacturer.description;			
			});
			rmsServices.init('lookup_types/Criticality/values');
			rmsServices.getById(PDU.Criticality).then(function(criticality){
				PDU.CriticalityName=criticality.description;			
			});
			rmsServices.init('lookup_types/MaintananceContractor/values');
			rmsServices.getById(PDU.MaintenanceContractor).then(function(maintenanceContractor){
				PDU.MaintenanceContractorName=maintenanceContractor.description;			
			});
			rmsServices.init('lookup_types/MaintainPeriod/values');
			rmsServices.getById(PDU.MaintainPeriod).then(function(maintainPeriod){
				PDU.MaintainPeriodName=maintainPeriod.description;			
			});
      $scope.PDU = PDU ;
		});
    })
    .controller("PDUAddController", function($rootScope, $scope, $location, rmsServices){
		var Rooms = rmsServices.init('classes/Room/cards');
		var PDUs = rmsServices.init('classes/GenericElectricalDevice/cards');
		$scope.func = "add";
    	$scope.add = function(){
    		var PDU={};
			PDU=$scope.PDU;
			rmsServices.create(PDU,function(id){
				$location.path("/device/PDUList");
    		});
    	};
    })
    .controller("PDUUpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('classes/GenericElectricalDevice/cards');
		rmsServices.getById($stateParams.id).then(function(PDU){
			$scope.PDU = PDU;
			console.log(PDU);
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
					rmsServices.init('classes/GenericElectricalDevice/cards');
					rmsServices.update($scope.PDU).then(function(){
						$location.path("/device/PDUList");
					});

				//});

			};

    });