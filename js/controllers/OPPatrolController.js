//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
	.controller("OPPatrolListController", function($scope,rmsServices){
		console.log("OPPatrolListController");
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
				$scope.OPPatrols = all;
				$scope.displayedCollection = [].concat(all);
				$scope.totalItemCount=$scope.displayedCollection.length;
		});
		$scope.name = "RMS";
		$scope.$on("updateOPPatrols", function (event, OPPatrol) {
			$scope.OPPatrols.push(OPPatrol);
		});

		$scope.remove = function(idx){
			bootbox.confirm("確定刪除?", function(result) {
				if (result) {
					rmsServices.delete($scope.OPPatrols[idx]).then(function(){
						$scope.OPPatrols.splice(idx, 1);
					});
				}
			});
		};
	})
	.controller("OPPatrolViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('processes/Workorder/instances');
		rmsServices.getById($stateParams.id).then(function(OPPatrol){
			rmsServices.init('lookup_types/ActivityStatus/values');
		  rmsServices.getById(OPPatrol.RequestStatus).then(function(status){
				 OPPatrol.RequestStatusName=status.description;
			});
			rmsServices.init('lookup_types/Gravity/values');
			rmsServices.getById(OPPatrol.Gravity).then(function(gravity){
				OPPatrol.GravityName=gravity.description;
			});
			rmsServices.init('lookup_types/Priority/values');
			rmsServices.getById(OPPatrol.Priority).then(function(priority){
				OPPatrol.PriorityName=priority.description;
			});
			rmsServices.init('domains/OPPatrolItem/relations');
			rmsServices.getAll().then(function(all){
				for(i=0; i<all.length; i++){
					var item = all[i];
					if(item._sourceId==OPPatrol._id){
						OPPatrol.OPPatrolItemName=item._destinationDescription;
						break;
					}
				}
			});
			$scope.OPPatrol = OPPatrol ;
		});
	})
	.controller("OPPatrolAddController", function($rootScope, $scope, $location, rmsServices){
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
			var OPPatrol={};
			OPPatrol=$scope.OPPatrol;
			OPPatrol.RequestType=1;
			rmsServices.create(OPPatrol,function(id){
				$location.path("/workorder/OPPatrolList");
			});
		};
	})
	.controller("OPPatrolUpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('processes/Workorder/instances');
		rmsServices.getById($stateParams.id).then(function(OPPatrol){
			rmsServices.init('lookup_types/ActivityStatus/values');
			rmsServices.getById(OPPatrol.ActivityStatus).then(function(status){
				OPPatrol.ActivityStatusName=status.description;
			});
			rmsServices.init('lookup_types/Gravity/values');
			rmsServices.getById(OPPatrol.Gravity).then(function(gravity){
				OPPatrol.GravityName=gravity.description;
			});
			rmsServices.init('lookup_types/Priority/values');
			rmsServices.getById(OPPatrol.Priority).then(function(priority){
				OPPatrol.PriorityName=priority.description;
			});
			rmsServices.init('domains/WorkorderItem/relations');
			rmsServices.getAll().then(function(all){
				for(i=0; i<all.length; i++){
					var item = all[i];
					if(item._sourceId==OPPatrol._id){
						OPPatrol.OPPatrolItemName=item._destinationDescription;
						break;
					}
				}
			});
			$scope.OPPatrol = OPPatrol ;
			console.log(OPPatrol);
		});

		$scope.update = function(){
			//console.log(JSON.stringify($scope.floor.myBuilding));
			//rmsServices.init('domains/BuildingFloor/relations');
			//rmsServices.getAll().then(function(buildingFloorRelations){
			rmsServices.init('processes/Workorder/instances');
			rmsServices.update($scope.OPPatrol).then(function(){
				$location.path("/workorder/OPPatrolList");
			});

			//});

		};

	});