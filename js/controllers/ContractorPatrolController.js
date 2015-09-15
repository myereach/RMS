//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
	.controller("ContractorPatrolListController", function($scope,rmsServices){
		console.log("ContractorPatrolListController");
		rmsServices.init('processes/Workorder/instances');
		rmsServices.getAll().then(function(all){
			for(i=0; i<all.length; i++){
				var item = all[i];
				if(item.ActivityStatus==102){
					item.ActivityStatussName = '已指派';
				} else {
					rmsServices.init('lookup_types/ActivityStatus/values');
					rmsServices.getById(item.ActivityStatus).then(function (status) {
						item.ActivityStatusName = status.description;
					});
				}
			}
			$scope.ContractorPatrols = all;
			$scope.displayedCollection = [].concat(all);
			$scope.totalItemCount=$scope.displayedCollection.length;
		});
		$scope.name = "RMS";
		$scope.$on("updateContractorPatrols", function (event, ContractorPatrol) {
			$scope.ContractorPatrols.push(ContractorPatrol);
		});

		$scope.remove = function(idx){
			bootbox.confirm("確定刪除?", function(result) {
				if (result) {
					rmsServices.delete($scope.ContractorPatrols[idx]).then(function(){
						$scope.ContractorPatrols.splice(idx, 1);
					});
				}
			});
		};
	})
	.controller("ContractorPatrolViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('processes/Workorder/instances');
		rmsServices.getById($stateParams.id).then(function(ContractorPatrol){
			rmsServices.init('lookup_types/ActivityStatus/values');
			rmsServices.getById(ContractorPatrol.RequestStatus).then(function(status){
				ContractorPatrol.RequestStatusName=status.description;
			});
			rmsServices.init('lookup_types/Gravity/values');
			rmsServices.getById(ContractorPatrol.Gravity).then(function(gravity){
				ContractorPatrol.GravityName=gravity.description;
			});
			rmsServices.init('lookup_types/Priority/values');
			rmsServices.getById(ContractorPatrol.Priority).then(function(priority){
				ContractorPatrol.PriorityName=priority.description;
			});
			rmsServices.init('domains/ContractorPatrolItem/relations');
			rmsServices.getAll().then(function(all){
				for(i=0; i<all.length; i++){
					var item = all[i];
					if(item._sourceId==ContractorPatrol._id){
						ContractorPatrol.ContractorPatrolItemName=item._destinationDescription;
						break;
					}
				}
			});
			$scope.ContractorPatrol = ContractorPatrol ;
		});
	})
	.controller("ContractorPatrolAddController", function($rootScope, $scope, $location, rmsServices){
		rmsServices.init('processes/Workorder/instances');

		/*rmsServices.init('classes/Room/cards');
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
		 });*/

		$scope.func = "add";
		$scope.add = function(){
			var ContractorPatrol={};
			ContractorPatrol=$scope.ContractorPatrol;
			ContractorPatrol.RequestType=1;
			rmsServices.create(ContractorPatrol,function(id){
				$location.path("/workorder/ContractorPatrolList");
			});
		};
	})
	.controller("ContractorPatrolUpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('processes/Workorder/instances');
		rmsServices.getById($stateParams.id).then(function(ContractorPatrol){
			rmsServices.init('lookup_types/ActivityStatus/values');
			rmsServices.getById(ContractorPatrol.ActivityStatus).then(function(status){
				ContractorPatrol.ActivityStatusName=status.description;
			});
			rmsServices.init('lookup_types/Gravity/values');
			rmsServices.getById(ContractorPatrol.Gravity).then(function(gravity){
				ContractorPatrol.GravityName=gravity.description;
			});
			rmsServices.init('lookup_types/Priority/values');
			rmsServices.getById(ContractorPatrol.Priority).then(function(priority){
				ContractorPatrol.PriorityName=priority.description;
			});
			rmsServices.init('domains/WorkorderItem/relations');
			rmsServices.getAll().then(function(all){
				for(i=0; i<all.length; i++){
					var item = all[i];
					if(item._sourceId==ContractorPatrol._id){
						ContractorPatrol.ContractorPatrolItemName=item._destinationDescription;
						break;
					}
				}
			});
			$scope.ContractorPatrol = ContractorPatrol ;
			console.log(ContractorPatrol);
		});

		$scope.update = function(){
			//console.log(JSON.stringify($scope.floor.myBuilding));
			//rmsServices.init('domains/BuildingFloor/relations');
			//rmsServices.getAll().then(function(buildingFloorRelations){
			rmsServices.init('processes/Workorder/instances');
			rmsServices.update($scope.ContractorPatrol).then(function(){
				$location.path("/workorder/ContractorPatrolList");
			});

			//});

		};

	});